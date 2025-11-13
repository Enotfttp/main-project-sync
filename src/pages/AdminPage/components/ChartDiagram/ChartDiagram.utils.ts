export const getStatusAppearance = (label: string) => {
  switch (label) {
    case 'Успешные':
      return 'success';
    case 'Ошибки':
      return 'danger';
    case 'В процессе':
      return 'warning';
    default:
      return 'primary';
  }
};
