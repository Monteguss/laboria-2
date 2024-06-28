document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.main-section');
    const sideBarItems = document.querySelectorAll('.side-bar-item');
    let currentIndex = 0;

    let isScrolling = false;
    const scrollDelay = 450;

    // Garante que as classes das seções estejam corretas
    function classTreatment(bufferIndex) {
        if (currentIndex > bufferIndex) {
            for (let i = bufferIndex + 1; i < currentIndex; i++) {
                sections[i].setAttribute('data-status', 'inactive-bottom');
            }
        }

        if (currentIndex < bufferIndex) {
            for (let i = currentIndex + 1; i < bufferIndex; i++) {
                sections[i].setAttribute('data-status', 'inactive-top');
            }
        }
    }

    function updateSection(bufferIndex) {
        if (currentIndex < bufferIndex) {
            sections[currentIndex].setAttribute('data-status', 'inactive-top');
            sections[bufferIndex].setAttribute('data-status', 'active');
        }

        if (currentIndex > bufferIndex) {
            sections[currentIndex].setAttribute('data-status', 'inactive-bottom');
            sections[bufferIndex].setAttribute('data-status', 'active');
        }
    }

    function updateSidebar(bufferIndex) {
        sideBarItems[currentIndex].setAttribute('data-status', 'inactive');
        sideBarItems[bufferIndex].setAttribute('data-status','active');
    }

    // Função para definir a seção ativa
    function setActive(bufferIndex) {

        classTreatment(bufferIndex);
        updateSidebar(bufferIndex);
        updateSection(bufferIndex);
        
        currentIndex = bufferIndex;
    }

    // Função para ativar itens da barra lateral
    sideBarItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            if (isScrolling) return;
            
            setActive(index);

            isScrolling = true;
            setTimeout(() => isScrolling = false, scrollDelay);
        });
    });

    // Função detectar scroll
    window.addEventListener('wheel', function(event) {
        if (isScrolling) return;

        if (event.deltaY > 0) {
            if (currentIndex < sections.length - 1) {
                setActive(currentIndex + 1);
                isScrolling = true; // Bloqueia a rolagem
                setTimeout(() => isScrolling = false, scrollDelay); // Desbloqueia após o atraso
            }

            console.log('Scroll Down'); // Só pra debug
        } else {
            if (currentIndex > 0) {
                setActive(currentIndex - 1);
                isScrolling = true;
                setTimeout(() => isScrolling = false, scrollDelay);
            }

            console.log('Scroll Up');
        }
    });

    // Define a seção inicial como ativa
    setActive(0);
});
