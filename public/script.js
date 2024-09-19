let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.setText("Обновить данные");
tg.MainButton.show();

const updateData = async () => {
    try {
        const response = await fetch('/get-data');
        const data = await response.json();
        
        document.getElementById('temperature').textContent = `${data.temperature.toFixed(1)} °C`;
        document.getElementById('humidity').textContent = `${data.humidity.toFixed(1)} %`;
        document.getElementById('vpd').textContent = `${data.vpd.toFixed(2)} kPa`;
        
        // Изменяем цвет виджетов в зависимости от значений
        updateWidgetColor('temperature-widget', data.temperature, 18, 25);
        updateWidgetColor('humidity-widget', data.humidity, 40, 60);
        updateWidgetColor('vpd-widget', data.vpd, 0.8, 1.2);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const updateWidgetColor = (widgetId, value, min, max) => {
    const widget = document.getElementById(widgetId);
    if (value < min) {
        widget.style.backgroundColor = 'var(--tg-theme-secondary-bg-color, #e57373)';
    } else if (value > max) {
        widget.style.backgroundColor = 'var(--tg-theme-secondary-bg-color, #81c784)';
    } else {
        widget.style.backgroundColor = 'var(--tg-theme-secondary-bg-color, #fff)';
    }
};

tg.MainButton.onClick(updateData);

// Начальное обновление данных
updateData();

// Обновляем данные каждые 30 секунд
setInterval(updateData, 30000);