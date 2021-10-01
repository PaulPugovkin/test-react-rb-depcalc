# Необходимо разработать интерфейс депозитного калькулятора согласно макету и описанным ниже условиям.

## В интерфейсе должна быть возможность указать следующие параметры:
    1) тип депозита - выбрать из предложенных вариантов;
    2) указать сумму депозита - от минимальной для выбранного типа и до 99 999 999 999, шаг 100 000;
    3) указать срок депозита - от минимального для выбранного типа и до 365 дней, шаг 1 день.
    На основании вышеперечисленных параметров система должна определить процентную ставку и предполагаемый доход. Также необходимо обеспечить возможность вывода указанных и рассчитанных данных на печать в формате pdf.
    Информация о сопоставлении процентных ставок с возможными суммами и сроками для всех депозитов отражена в файле depcalc.json.
### Описание json:
    - code - уникальный идентификатор депозитного продукта
    - name - наименование депозитного продукта, отображаемое клиенту
    - param - массив возможных параметров депозита
    - period_from - минимальное значение срока депозита, т.е. "от n дней"
    - summs_and_rate - массив сумм и ставок по депозиту для конкретного срока
    - summ_from - минимальная сумма депозита, т.е. "от n рублей"
    - rate - процентная ставка (для периода и суммы)
### На что требуется обратить внимание:
    - в json хранятся диапазоны сроков, где period_from - пограничное значение диапазона. Каждый period_from является началом нового диапазона, концом диапазона является следующее значение period_from-1, но для последнего period_from  концом диапазона будет фиксированное значение 365. Пример, period_from = 1, period_from = 2 и period_from = 7 образуют диапазоны сроков "1 день", "от 2 до 6 дней", и "от 7 до 365 дней" (в случае, если period_from = 7 является последним значением).
    - По тому же принципу работают диапазоны сумм summ_from, только конец последнего диапазона = 99 999 999 999. Таким образом, summ_from = 100, summ_from = 300 и summ_from = 600, образуют диапазоны сумм "от 100 до 299 рублей", "от 300 до 599 рублей" и " от 600 до 99 999 999 999 рублей" (в случае, если summ_from = 600 является последним значением).
    - Для каждого из депозитных продуктов требуется анализировать минимальные значения сроков и сумм, не давая в интерфейсе установить значения меньше. На примере json файла для депозита "Универсальный" для срока в 1 день сумма в 1 000 000 рублей будет минимальной, но для срока в 31 день - уже 500 000 рублей будут минимальным.