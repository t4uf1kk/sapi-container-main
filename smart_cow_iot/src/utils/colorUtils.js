export const getActivityColor = (activity) => {
  if (activity.includes('Tidur') || activity.includes('Diam')) return 'text-blue-600 bg-blue-50';
  if (activity.includes('Berjalan')) return 'text-green-600 bg-green-50';
  if (activity.includes('Berlari')) return 'text-red-600 bg-red-50';
  if (activity.includes('Dozing')) return 'text-purple-600 bg-purple-50';
  if (activity.includes('Gelisah')) return 'text-orange-600 bg-orange-50';
  return 'text-gray-600 bg-gray-50';
};
