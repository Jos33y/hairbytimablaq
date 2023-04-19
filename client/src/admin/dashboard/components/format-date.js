
function getDaySuffix(dayOfMonth) {
    if (dayOfMonth >= 11 && dayOfMonth <= 13) {
      return 'th';
    }
    switch (dayOfMonth % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }
  
export const DashFormatDate = (date) => {
    const dayOfMonth = date.getDate();
    const year = date.getFullYear();
    const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
    const suffix = getDaySuffix(dayOfMonth);
    return `${dayOfMonth}${suffix} ${month}, ${year}`;
  }

