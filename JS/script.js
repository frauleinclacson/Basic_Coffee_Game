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

const toppingIcons = {
    'cocoa powder': '🍫',
    'cinnamon powder': '✨',
    'chocolate chips': '🍫',
    'marshmallows': '☁️',
    'whipped cream': '🍦'
};

const syrupIcons = {
    'vanilla': '🌼',
    'caramel': '🍯',
    'chocolate': '🍫',
    'cinnamon': '🌰',
    'peppermint': '🌿'
};

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

function getDrinkColor() {
    const baseColors = {
        'espresso': '#1a0f0a',
        'americano': '#2d1810',
        'cold brew': '#1a0f0a',
        'decaf': '#3E2723'
    };
    
    let color = baseColors[selections.base];
    
    if (selections.milk.includes('milk') || selections.milk.includes('cream')) {
        color = '#8B6F47';
    }
    
    if (selections.syrup === 'chocolate') {
        color = '#4A2C2A';
    } else if (selections.syrup === 'caramel') {
        color = '#9B7653';
    }
    
    return color;
}

function displayFinalDrink() {
    const display = document.getElementById('drinkDisplay');
    const sipsText = document.getElementById('sipsLeft');
    const drinkColor = getDrinkColor();
    
    let drinkHTML = '';
    
    if (selections.isGlass) {
        drinkHTML = `
            <div class="final-glass">
                <div class="drink-content" id="drinkContent" style="height: 100%; background: linear-gradient(to top, ${drinkColor} 0%, ${drinkColor}CC 70%, #F5E6D3 100%);"></div>
        `;
        
        if (selections.milk === 'cold foam') {
            drinkHTML += '<div class="foam-layer"></div>';
        }
        
        drinkHTML += '</div>';
    } else {
        drinkHTML = `
            <div class="final-cup">
                <div class="drink-content" id="drinkContent" style="height: 100%; background: linear-gradient(to top, ${drinkColor} 0%, ${drinkColor}CC 70%, #F5E6D3 100%);"></div>
        `;
        
        if (selections.milk === 'milk foam') {
            drinkHTML += '<div class="foam-layer"></div>';
        }
        
        drinkHTML += '</div>';
    }
    
    display.innerHTML = drinkHTML;
    
    if (selections.milk === 'whipped cream' || selections.toppings === 'whipped cream') {
        const container = display.querySelector('.final-glass, .final-cup');
        const cream = document.createElement('div');
        cream.className = 'whipped-cream-top';
        container.appendChild(cream);
    }
    
    if (selections.toppings && selections.toppings !== 'whipped cream') {
        const icon = document.createElement('div');
        icon.className = 'topping-icon';
        icon.textContent = toppingIcons[selections.toppings];
        icon.style.top = selections.milk === 'whipped cream' ? '-35px' : '5px';
        icon.style.left = '50%';
        icon.style.transform = 'translateX(-50%)';
        display.querySelector('.final-glass, .final-cup').appendChild(icon);
    }
    
    displayRecipe();
    sipsText.textContent = `Sips left: ${sipsRemaining}`;
}

function displayRecipe() {
    const summary = document.getElementById('recipeSummary');
    summary.innerHTML = `
        <h3>Your Recipe</h3>
        <p><span class="ingredient-icon">☕</span><strong>Base:</strong> ${selections.base}</p>
        <p><span class="ingredient-icon">🥛</span><strong>Milk:</strong> ${selections.milk}</p>
        <p><span class="ingredient-icon">${syrupIcons[selections.syrup]}</span><strong>Syrup:</strong> ${selections.syrup}</p>
        <p><span class="ingredient-icon">🍬</span><strong>Sweetener:</strong> ${selections.sweetener}</p>
        <p><span class="ingredient-icon">${toppingIcons[selections.toppings]}</span><strong>Topping:</strong> ${selections.toppings}</p>
    `;
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