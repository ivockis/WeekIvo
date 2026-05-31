document.addEventListener('DOMContentLoaded', () => {

    // 0. Hero Canvas "Diega" Kursors
    const canvas = document.getElementById('hero-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = document.querySelector('.hero-section').offsetHeight;

        // Sekojošo punktu (Trail) fizikas parametri
        const points = [];
        const numPoints = 25; // Cik garš ir diegs
        let mouse = { x: width / 2, y: height / 2 };
        let isMoving = false; // Pārbauda vai pele kustas Hero zonā
        let isHeroCursorActive = window.innerWidth >= 768;

        // Inicializē punktus
        for (let i = 0; i < numPoints; i++) {
            points.push({ x: width / 2, y: height / 2 });
        }

        // Peles klausītāji tikai virs Hero sekcijas
        const heroSection = document.querySelector('.hero-section');
        heroSection.addEventListener('mousemove', (e) => {
            if (!isHeroCursorActive) return;
            isMoving = true;
            // Korekcija ja lapu skrollē
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });
        heroSection.addEventListener('mouseleave', () => {
            if (!isHeroCursorActive) return;
            isMoving = false; // Pele iziet, ļaujam vilkties uz pēdējo punktu vai centrēties lēnām
        });

        function updateCanvasSize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = document.querySelector('.hero-section').offsetHeight;
        }

        function setCanvasVisibility() {
            canvas.style.display = isHeroCursorActive ? 'block' : 'none';
            if (!isHeroCursorActive) {
                ctx.clearRect(0, 0, width, height);
            }
        }

        window.addEventListener('resize', () => {
            const wasActive = isHeroCursorActive;
            isHeroCursorActive = window.innerWidth >= 768;
            updateCanvasSize();
            setCanvasVisibility();
            if (isHeroCursorActive && !wasActive) {
                animateCanvas();
            }
        });

        // Tēmas krāsu reakcija kanvai
        function getAccentColor() {
            const isDark = document.body.getAttribute('data-theme') === 'dark';
            return isDark ? 'rgba(52, 211, 153, 0.8)' : 'rgba(16, 185, 129, 0.8)'; // Smaragds vai Zaļš
        }

        // Animācijas Cikls
        function animateCanvas() {
            if (!isHeroCursorActive) {
                ctx.clearRect(0, 0, width, height);
                return;
            }

            ctx.clearRect(0, 0, width, height);

            // Pirmais punkts vienmēr seko pelei
            let targetX = mouse.x;
            let targetY = mouse.y;

            // Zīmējam pavedienu kā vienu nepārtrauktu līniju
            ctx.beginPath();
            ctx.strokeStyle = getAccentColor();
            ctx.lineWidth = 3;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';

            for (let i = 0; i < numPoints; i++) {
                let p = points[i];

                // Pievienojam elastības fiziku - stiepjas uz priekšu un seko iepriekšējam punktam
                // Jo tālāk pa diegu, jo mazāka ietekme no peles kustības ātruma (sluggish effect)
                p.x += (targetX - p.x) * 0.4;
                p.y += (targetY - p.y) * 0.4;

                if (i === 0) {
                    ctx.moveTo(p.x, p.y);
                } else {
                    ctx.lineTo(p.x, p.y);
                }

                // Nākamais mērķis ir *šī* punkta jaunā pozīcija
                targetX = p.x;
                targetY = p.y;
            }
            ctx.stroke();

            // Pievienojam peles "galviņu"
            if(isMoving) {
                ctx.beginPath();
                ctx.arc(points[0].x, points[0].y, 6, 0, Math.PI * 2);
                ctx.fillStyle = getAccentColor();
                ctx.fill();
            }

            requestAnimationFrame(animateCanvas);
        }

        setCanvasVisibility();
        if (isHeroCursorActive) {
            animateCanvas();
        }
    }
    // 1. Tēmas (Dark/Light Mode) Pārslēdzējs
    const themeSwitchBtn = document.getElementById('theme-toggle');
    const themeIcon = themeSwitchBtn.querySelector('i');

    // Pārbauda localStorage vai sistēmas iestatījumus
    const currentTheme = localStorage.getItem('theme') || 
                         (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    // Uzstāda sākotnējo tēmu
    if (currentTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun'); // Nomaina ikonu uz sauli
    }

    // Pārslēgšanas loģika
    themeSwitchBtn.addEventListener('click', () => {
        let theme = document.body.getAttribute('data-theme');
        if (theme === 'dark') {
            // Pārsledz uz gaišo
            document.body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        } else {
            // Pārslēdz uz tumšo
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        }
    });

    // 2. Vienmērīga ritināšana (Smooth Scrolling)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return; // Ja saite ir tikai '#', ignorējam
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Rēķinām līdzi fiksētajai galvenei (header) lai tā neaizsedz virsrakstu
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                     top: offsetPosition,
                     behavior: "smooth"
                });
            }
        });
    });

    // 3. Scroll Reveal Animācijas
    const revealElements = document.querySelectorAll('.reveal');
    
    // Ja pārlūks atbalsta IntersectionObserver
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // Animē tikai vienreiz
                }
            });
        }, {
            root: null,
            threshold: 0.15, // Cik % no elementa jābūt redzamiem lai trigerētos
            rootMargin: "0px 0px -50px 0px"
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback vecākiem pārlūkiem
        revealElements.forEach(el => el.classList.add('active'));
    }

    // 4. Mobilā izvēlne (Hamburger Menu)
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
        
        // Aizvērt izvēlni nospiežot uz kādu no saitēm
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // 5. Lasīšanas progresa indikators (Scroll Progress)
    const progressBar = document.getElementById('scroll-progress');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            // Kopējais lapas augstums mīnus redzamais augstums
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + "%";
        });
    }

    // 6. 3D Parallax Tilt efekts kartītēm (Cards)
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        // Pievienojam klasi kas atspējo CSS hover TranslateY lai nebojātu šo interakciju
        card.classList.add('no-tilt-hover');
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;  
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Aprēķina slīpuma leņķus (Max 10 grādi atkarībā no kursora pozīcijas)
            const rotateX = ((y - centerY) / centerY) * -10; 
            const rotateY = ((x - centerX) / centerX) * 10;
            
            // Pielieto efektu
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            // Atgriežas sākumstāvoklī kad pele pazūd
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.transition = "transform 0.5s ease";
        });
        
        card.addEventListener('mouseenter', () => {
            // Noņem pārejas aizkavi, lai tilt sekotu līdzi precīzi
            card.style.transition = "transform 0.1s ease-out"; 
        });
    });

    // 7. Mini spēle "Bug Catcher"
    const bugGameBoard = document.getElementById('bug-game-board');
    const startBugGameBtn = document.getElementById('start-game-btn');
    const bugScoreEl = document.getElementById('bug-score');
    const bugGameOverlay = document.getElementById('game-overlay');
    
    if (bugGameBoard && startBugGameBtn && bugScoreEl) {
        let bugScore = 0;
        let gameActive = false;
        let bugInterval;

        function spawnBug() {
            if (!gameActive) return;
            
            const bug = document.createElement('i');
            bug.className = 'fa-solid fa-bug bug-icon';
            
            // Random pozīcija (padarot drošu atstarpi no malām)
            const maxX = bugGameBoard.clientWidth - 50;
            const maxY = bugGameBoard.clientHeight - 50;
            const randomX = Math.floor(Math.random() * maxX) + 10;
            const randomY = Math.floor(Math.random() * maxY) + 10;
            
            bug.style.left = randomX + 'px';
            bug.style.top = randomY + 'px';
            
            // Click event jeb "izķeršana"
            bug.addEventListener('mousedown', (e) => { // mousedown labākai reakcijai
                bugScore++;
                bugScoreEl.innerText = bugScore;
                e.target.remove(); // Noņemam no laukuma
            });
            
            bugGameBoard.appendChild(bug);
            
            // Bug pazūd pats pēc 1.2 sekundēm ja nav noķerts
            setTimeout(() => {
                if(bug.parentElement) {
                    bug.remove(); 
                }
            }, 1200);
        }

        function startGame() {
            if (gameActive) return;
            gameActive = true;
            bugScore = 0;
            bugScoreEl.innerText = bugScore;
            bugGameOverlay.style.display = 'none'; // Paslēpjam overlay
            
            // Sākam spārnot kļūdas
            bugInterval = setInterval(spawnBug, 700);
            
            // Spēle ilgst 15 sekundes
            setTimeout(endGame, 15000);
        }

        function endGame() {
            gameActive = false;
            clearInterval(bugInterval);
            
            // Notīrīt laukumu
            document.querySelectorAll('.bug-icon').forEach(b => b.remove());
            
            // Parādīt rezultātu
            bugGameOverlay.style.display = 'flex';
            bugGameOverlay.innerHTML = `
                <h3 style="color:#fff; margin-bottom:1rem; text-align:center;">Laiks beidzies!<br>Izķerti ${bugScore} bugi!</h3>
                <button id="restart-game-btn" class="btn btn-primary">Spēlēt Vēlreiz</button>
            `;
            
            // Piesienam atkārtotas palaišanas notikumu saitei
            document.getElementById('restart-game-btn').addEventListener('click', startGame);
        }

        startBugGameBtn.addEventListener('click', startGame);
    }

    // 8. Lekciju Saraksts (Timetable) ar reālajiem datiem
    const timetableData = {
        pirmdiena: [
            { time: "08.30 - 10.10", title: "Dabas zinātnes", teacher: "Driķis Ivars", loc: "18. aud." },
            { time: "10.30 - 12.10", title: "Dabas zinātnes", teacher: "Driķis Ivars", loc: "18. aud." },
            { time: "12.10 - 14.10", title: "Prakse (Mērķis: 2h)", teacher: "Pieejams ofiss / attālināti", loc: "Prakse" },
            { time: "14.30 - 16.10", title: "Datu bāzu praktikums", teacher: "Darja Solodovņikova", loc: "345. telpa" }
        ],
        otrdiena: [
            { time: "08.00 - 14.10", title: "Prakse (Mērķis: 6h)", teacher: "Pieejams ofiss / attālināti", loc: "Prakse" },
            { time: "14.30 - 16.10", title: "Algoritmu teorija", teacher: "Ambainis Andris", loc: "415. aud." },
            { time: "17.00 - 18.30", title: "Caurviju prasmju attīstība izglītībā", teacher: "Egils Blūms", loc: "Tiešsaistē" }
        ],
        tresdiena: [
            { time: "08.30 - 10.10", title: "Tīmekļa dizaina pamati", teacher: "Zariņa Solvita", loc: "13. aud." },
            { time: "10.10 - 16.10", title: "Prakse (Mērķis: 6h)", teacher: "Pieejams ofiss / attālināti", loc: "Prakse" },
            { time: "14.30 - 16.10", title: "Datoru grafikas / Tīmekļa dizains (Lab)", teacher: "Kārlis F. / Solvita Z.", loc: "13. aud. / 345. telpa" },
            { time: "16.30 - 18.05", title: "Veselības traucējumi bērniem", teacher: "Inguna Ebela", loc: "Tiešsaistē" },
            { time: "18.15 - 19.45", title: "Tīmekļa dizaina pamati (lab.d)", teacher: "Zariņa Solvita", loc: "345. telpa" }
        ],
        ceturtdiena: [
            { time: "08.00 - 16.10", title: "Prakse (Mērķis: 8h)", teacher: "Pieejams ofiss / attālināti", loc: "Prakse" },
            { time: "16.30 - 18.05", title: "Objektorientētā programmēšana", teacher: "Vītoliņš Valdis", loc: "Tiešsaistē" },
            { time: "18.15 - 19.45", title: "Objektorientētā programmēšana", teacher: "Vītoliņš Valdis", loc: "Tiešsaistē" }
        ],
        piektdiena: [
            { time: "08.30 - 10.00", title: "Sporta aktivitātes I", teacher: "Rihards Parandjuks", loc: "Klātienē / Attālināti" },
            { time: "10.00 - 18.00", title: "Prakse (Mērķis: 8h)", teacher: "Pieejams ofiss / attālināti", loc: "Prakse" }
        ]
    };

    const dayBtns = document.querySelectorAll('.day-btn');
    const timetableContent = document.getElementById('timetable-content');

    function renderTimetable(day) {
        if (!timetableContent) return;
        
        // Sākuma animācijas izzušana gludai pārejai
        timetableContent.style.opacity = 0;
        
        setTimeout(() => {
            timetableContent.innerHTML = '';
            const schedule = timetableData[day];
            
            if (schedule && schedule.length > 0) {
                schedule.forEach((item, index) => {
                    const delay = index * 0.1; 
                    const div = document.createElement('div');
                    div.className = 'schedule-item';
                    div.style.animationDelay = `${delay}s`;
                    div.innerHTML = `
                        <div class="schedule-time">${item.time}</div>
                        <div class="schedule-details">
                            <h4>${item.title}</h4>
                            <div class="schedule-meta"><i class="fa-solid fa-user-tie"></i> ${item.teacher}</div>
                        </div>
                        <div class="schedule-location"><i class="fa-solid fa-location-dot"></i> ${item.loc}</div>
                    `;
                    timetableContent.appendChild(div);
                });
            }
            
            // Ieslēdz atpakaļ redzamību
            timetableContent.style.opacity = 1;
        }, 300); // Gaida, kamēr izdziest vecais saturs
    }

    if (dayBtns.length > 0 && timetableContent) {
        // Inicializē ar pirmdienu atverot mājaslapu
        renderTimetable('pirmdiena');

        dayBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Noņemt active klasi visiem
                dayBtns.forEach(b => b.classList.remove('active'));
                // Pievieno klikšķinātajam
                btn.classList.add('active');
                // Renderē animēto saturu
                renderTimetable(btn.getAttribute('data-day'));
            });
        });
    }

    // 9. Peldošās ikonas Hero fonam
    const heroIconsContainer = document.getElementById('hero-floating-icons');
    if (heroIconsContainer) {
        // Datorikas/IT tematikas ikonas
        const icons = ['fa-code', 'fa-laptop-code', 'fa-database', 'fa-server', 'fa-bug', 'fa-microchip', 'fa-network-wired', 'fa-terminal', 'fa-mug-hot'];
        const iconCount = window.innerWidth < 768 ? 12 : 30; // Mazāk ikonu telefonos, lai saglabātu veiktspēju
        
        for (let i = 0; i < iconCount; i++) {
            const iconEl = document.createElement('i');
            const randomIcon = icons[Math.floor(Math.random() * icons.length)];
            iconEl.className = `fa-solid ${randomIcon} float-icon`;
            
            // Nejauši izmēri un novietojums
            const size = Math.random() * 2 + 1; // 1rem līdz 3rem
            const left = Math.random() * 100; // 0% līdz 100% no ekrāna platuma
            const duration = Math.random() * 20 + 15; // 15s līdz 35s ilgums
            const delay = Math.random() * 20; // 0s līdz 20s aizture (mīnuss, lai sāk uzreiz fāzē)
            
            iconEl.style.fontSize = `${size}rem`;
            iconEl.style.left = `${left}%`;
            iconEl.style.animationDuration = `${duration}s`;
            iconEl.style.animationDelay = `-${delay}s`;
            
            heroIconsContainer.appendChild(iconEl);
        }
    }

});
