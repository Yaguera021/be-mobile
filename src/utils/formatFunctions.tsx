const formatPhoneNumber = (phoneNumber: string): string => {
  const cleaned = ("" + phoneNumber).replace(/\D/g, "");

  const match = cleaned.match(/^(\d{2})(\d{2})(\d{5})(\d{4})$/);

  if (match) {
    return `+${match[1]} (${match[2]}) ${match[3].slice(0, 5)}-${match[3].slice(
      5,
    )}${match[4]}`;
  }

  return phoneNumber;
};

const formatDate = (isoDateString: string) => {
  const date = new Date(isoDateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${day}/${month}/${year}`;
};

const removeAccents = (str: string) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

const cleanPhoneNumber = (phoneNumber: string) => {
  return phoneNumber.replace(/[+\-()\s]/g, "");
};

const normalizeSearch = (str: string) => {
  return removeAccents(cleanPhoneNumber(str.toLowerCase()));
};

export {
  formatPhoneNumber,
  formatDate,
  removeAccents,
  cleanPhoneNumber,
  normalizeSearch,
};
