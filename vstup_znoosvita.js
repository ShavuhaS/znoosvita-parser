function bruh(mark) {
    let rows = document.querySelectorAll('table tr');
    let orderedTable = document.querySelectorAll('.table-of-specs-item')
    orderedTable = orderedTable[orderedTable.length - 1]
    let foundLength = 0;
    let budgetLength = 0;
    let quota1Length = 0;
    let quota2Length = 0;
    let picked = [];
    let marks = []
    let orderedBudget = 0;
    let orderedQuota1 = 0;
    let orderedQuota2 = 0;
    let possibleLeavers = 0;
    const markSize = 9;
    const nameSize = 24;
    const prioritySize = 3;

    orderedTable.childNodes.forEach( (item, ind) => {
        if(item.nodeType === 3) {
            if(item.textContent.includes('квота 1')) {
                let b = orderedTable.childNodes[ind + 1];
                orderedQuota1 = parseInt(b.textContent, 10);
            } else {
                if(item.textContent.includes('квота 2')) {
                    let b = orderedTable.childNodes[ind + 1];
                    orderedQuota2 = parseInt(b.textContent, 10);
                } else {
                    if(item.textContent.includes('держзамовлення')) {
                        let b = orderedTable.childNodes[ind + 1];
                        orderedBudget = parseInt(b.textContent, 10);
                    }
                }
            }
        }
    });
    rows.forEach( (row) => {
        let columns = row.querySelectorAll('td');
        let currMark = -1, name = '', budget = '', priority = -1, quota = '';
        columns.forEach( (column) => {
            if(column.dataset.th === 'ПІБ') name=column.textContent;
            if(column.dataset.th === 'Бал') currMark = parseFloat(column.textContent.trim());
            if(column.dataset.th === 'Тип') budget = column.textContent;
            if(column.dataset.th === 'П') priority = parseInt(column.textContent.trim(), 10);
            if(column.dataset.th === 'КВ') quota = column.textContent.trim();
        })
        if(quota.includes('КВ1')) quota1Length++;
        if(quota.includes('КВ2')) quota2Length++;
        if(budget.includes('Б') && !quota.includes('КВ')) {
            marks.push(currMark);
            budgetLength++;
            if(currMark >= mark) {
            	if(priority !== 1) possibleLeavers++;
               foundLength++;
               picked.push([name, currMark, priority]);
            }
        }
    })
    picked.sort((a, b) => {
        if(a[1] > b[1]) return -1;
    });

    function drawLine() {
        console.log('-'.repeat(markSize + nameSize + prioritySize + 4))
    }
    function makeHeader() {
        drawLine();

        const nameVal = "ПІБ вступника (Б)";
        const markVal = "Рейтинг";
        const priorityVal = "П";
        let output = '|%c'
        let name = nameVal.padStart(nameVal.length + Math.floor((nameSize - nameVal.length) / 2), ' ').padEnd(nameSize, ' ')
        output += name + '%c|%c'
        let mark = markVal.padStart(markVal.length + Math.floor((markSize - markVal.length) / 2), ' ').padEnd(markSize, ' ')
        output += mark + '%c|%c'
        let priority = ' ' + priorityVal + ' '
        output += priority + '%c|'
        console.log(output, 'color: red', 'color: black', 'color: blue', 'color: black', 'color: green', 'color: black')

        drawLine();
    }
    
    makeHeader();
    picked.forEach( (item) => {
        let output = '|%c'
        let name = item[0].padStart(item[0].length + Math.floor((nameSize - item[0].length) / 2), ' ').padEnd(nameSize, ' ')
        output += name + '%c|%c'
        let mark = item[1].toString()
        mark = mark.padStart(mark.length + Math.floor((markSize - mark.length) / 2), ' ').padEnd(markSize, ' ')
        output += mark + '%c|%c'
        let priority = ' ' + item[2] + ' '
        output += priority + '%c|'
        console.log(output, 'background: pink', 'background: none', 'background: lightblue', 'background: none', 'background: lightgreen', 'background: none')
        drawLine();
    });
    const entryBoundary = orderedBudget - Math.min(orderedQuota1, quota1Length) - Math.min(orderedQuota2, quota2Length);
    marks.sort( (a, b) => a > b ? -1 : 1);
    console.log(' ')
    console.log('Кількість: ', foundLength, " з ", budgetLength, ' на бюджет')
    console.log('Квотників1: ', quota1Length, ' з ', orderedQuota1, ' допустимих')
    console.log('Квотників2: ', quota2Length, ' з ', orderedQuota2, ' допустимих')
    console.log('Прохідний бал на бюджет (на даний момент): ', marks[Math.min(entryBoundary-1, marks.length - 1)])
    console.log('Якщо бал дорівнює ↑, дивіться пріоритет')
    console.log('Можливих вакантних місць на бюджет (не з 1 пріорит.): ', possibleLeavers)
}