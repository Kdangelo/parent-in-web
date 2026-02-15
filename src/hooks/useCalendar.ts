// hooks/useCalendar.ts
export const useCalendar = (viewDate: Date, startOnMonday = true) => {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  // Si startOnMonday es true, usamos el ajuste (+6)%7. Si es false (empieza Domingo), usamos .getDay() directo.
  const firstDayIndex = startOnMonday 
    ? (new Date(year, month, 1).getDay() + 6) % 7 
    : new Date(year, month, 1).getDay();

  const diasSemana = startOnMonday 
    ? ['L', 'M', 'M', 'J', 'V', 'S', 'D'] 
    : ['D', 'L', 'M', 'M', 'J', 'V', 'S'];

  const nombreMes = viewDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' });

  return { daysInMonth, firstDayIndex, diasSemana, month, year, nombreMes };
};