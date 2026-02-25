const STORAGE_KEY = 'linkedinContacts';
const STATUSES = [
  'Novo',
  'Contactado',
  'Respondeu',
  'Entrevista',
  'Submissão',
  'Sem resposta',
  'Rejeitado'
];

const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const linkedinUrlInput = document.getElementById('linkedinUrl');
const prefillCurrentButton = document.getElementById('prefillCurrent');
const contactsContainer = document.getElementById('contacts');
const metricsContainer = document.getElementById('metrics');
const contactTemplate = document.getElementById('contactTemplate');

init();

async function init() {
  await render();

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const contact = {
      id: crypto.randomUUID(),
      name: nameInput.value.trim(),
      linkedinUrl: linkedinUrlInput.value.trim(),
      status: 'Novo',
      createdAt: new Date().toISOString()
    };

    if (!contact.name || !contact.linkedinUrl) return;

    const contacts = await getContacts();
    contacts.unshift(contact);
    await saveContacts(contacts);

    form.reset();
    await render();
  });

  prefillCurrentButton.addEventListener('click', prefillFromCurrentTab);
}

async function prefillFromCurrentTab() {
  const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (!activeTab?.url?.includes('linkedin.com')) {
    return;
  }

  linkedinUrlInput.value = activeTab.url;
  nameInput.value = (activeTab.title || '')
    .replace(/\|\s*LinkedIn.*/i, '')
    .replace(/\(\d+\)\s*/g, '')
    .trim();
}

async function getContacts() {
  const result = await chrome.storage.local.get(STORAGE_KEY);
  return result[STORAGE_KEY] || [];
}

async function saveContacts(contacts) {
  await chrome.storage.local.set({ [STORAGE_KEY]: contacts });
}

async function updateStatus(id, status) {
  const contacts = await getContacts();
  const updated = contacts.map((contact) =>
    contact.id === id ? { ...contact, status } : contact
  );
  await saveContacts(updated);
  await render();
}

async function removeContact(id) {
  const contacts = await getContacts();
  const filtered = contacts.filter((contact) => contact.id !== id);
  await saveContacts(filtered);
  await render();
}

function buildMetrics(contacts) {
  const contacted = contacts.filter((c) => c.status !== 'Novo').length;
  const responded = contacts.filter((c) =>
    ['Respondeu', 'Entrevista', 'Submissão', 'Rejeitado'].includes(c.status)
  ).length;
  const interviews = contacts.filter((c) => c.status === 'Entrevista').length;
  const submissions = contacts.filter((c) => c.status === 'Submissão').length;

  const base = contacted || 1;
  const responseRate = ((responded / base) * 100).toFixed(1);
  const interviewRate = ((interviews / base) * 100).toFixed(1);
  const submissionRate = ((submissions / base) * 100).toFixed(1);

  return [
    { label: 'Total', value: contacts.length },
    { label: 'Contactados', value: contacted },
    { label: 'Taxa de resposta', value: `${responseRate}%` },
    { label: 'Taxa entrevistas', value: `${interviewRate}%` },
    { label: 'Taxa submissões', value: `${submissionRate}%` }
  ];
}

async function render() {
  const contacts = await getContacts();

  metricsContainer.innerHTML = '';
  buildMetrics(contacts).forEach((metric) => {
    const card = document.createElement('div');
    card.className = 'metric';
    card.innerHTML = `<strong>${metric.value}</strong><span>${metric.label}</span>`;
    metricsContainer.appendChild(card);
  });

  contactsContainer.innerHTML = '';

  if (!contacts.length) {
    contactsContainer.innerHTML = '<div class="empty-state">Ainda não tens contactos guardados.</div>';
    return;
  }

  contacts.forEach((contact) => {
    const fragment = contactTemplate.content.cloneNode(true);
    const item = fragment.querySelector('.contact-item');
    const nameLink = fragment.querySelector('.contact-name');
    const createdAt = fragment.querySelector('.created-at');
    const statusSelect = fragment.querySelector('.status-select');
    const markContactedButton = fragment.querySelector('.mark-contacted');
    const removeButton = fragment.querySelector('.remove');

    nameLink.textContent = contact.name;
    nameLink.href = contact.linkedinUrl;
    createdAt.textContent = new Date(contact.createdAt).toLocaleDateString('pt-PT');

    STATUSES.forEach((status) => {
      const option = document.createElement('option');
      option.value = status;
      option.textContent = status;
      if (contact.status === status) option.selected = true;
      statusSelect.appendChild(option);
    });

    statusSelect.addEventListener('change', () => updateStatus(contact.id, statusSelect.value));
    markContactedButton.addEventListener('click', () => updateStatus(contact.id, 'Contactado'));
    removeButton.addEventListener('click', () => removeContact(contact.id));

    item.dataset.id = contact.id;
    contactsContainer.appendChild(fragment);
  });
}
