let currentPage = 0;
const pages = ['welcome', 'base', 'milk', 'syrup', 'sweetener', 'toppings', 'final'];
let selections = {
    base: '',
    isGlass: false,
    milk: '',
    syrup: '',
    sweetener: '',
    toppings: ''
};
let sipsRemaining = 0;

function nextPage() {
    document.getElementById(pages[currentPage]).classList.remove('active');
    currentPage++;
    document.getElementById(pages[currentPage]).classList.add('active');
}

function selectBase(base, isGlass) {
    selections.base = base;
    selections.isGlass = isGlass;
    sipsRemaining = isGlass ? 5 : 3;
    setTimeout(nextPage, 300);
}

function selectOption(category, value) {
    selections[category] = value;
    setTimeout(() => {
        if (currentPage < pages.length - 1) {
            nextPage();
            if (currentPage === pages.length - 1) {
                displayFinalDrink();
            }
        }
    }, 300);
}

function displayFinalDrink() {
    const display = document.getElementById('drinkDisplay');
    const sipsText = document.getElementById('sipsLeft');
    
    if (selections.isGlass) {
        display.innerHTML = `
            <div class="final-glass">
                <div class="drink-content" id="drinkContent" style="height: 100%; background: linear-gradient(to top, #1a0f0a 0%, #3E2723 50%, #F5E6D3 100%);"></div>
            </div>
        `;
    } else {
        display.innerHTML = `
            <div class="final-cup">
                <div class="drink-content" id="drinkContent" style="height: 100%; background: linear-gradient(to top, #1a0f0a 0%, #3E2723 50%, #F5E6D3 100%);"></div>
            </div>
        `;
    }
    
    sipsText.textContent = `Sips left: ${sipsRemaining}`;
}

function sipDrink() {
    if (sipsRemaining > 0) {
        sipsRemaining--;
        const drinkContent = document.getElementById('drinkContent');
        const percentage = (sipsRemaining / (selections.isGlass ? 5 : 3)) * 100;
        drinkContent.style.height = percentage + '%';
        document.getElementById('sipsLeft').textContent = `Sips left: ${sipsRemaining}`;
        
        if (sipsRemaining === 0) {
            setTimeout(() => {
                document.getElementById('againBtn').style.display = 'block';
            }, 500);
        }
    }
}

function restart() {
    currentPage = 0;
    selections = {
        base: '',
        isGlass: false,
        milk: '',
        syrup: '',
        sweetener: '',
        toppings: ''
    };
    sipsRemaining = 0;
    document.getElementById('againBtn').style.display = 'none';
    
    pages.forEach(page => {
        document.getElementById(page).classList.remove('active');
    });
    document.getElementById('welcome').classList.add('active');
}