import React, { useEffect } from 'react';

export default function Toc() {

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                document.querySelectorAll('.toc-nav a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { rootMargin: '-20% 0px -80% 0px' });

    document.querySelectorAll('h1[id], h2[id]').forEach((section) => {
        observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
        // Calculate position accounting for the fixed sticky header
        const headerOffset = 96;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
        
        window.history.pushState(null, null, `#${id}`);
    }
  };

  return (
    <aside className="toc-sidebar">
        <div className="toc-title">On this page</div>
        <ul className="toc-nav">
            <li><a href="#welcome" onClick={(e) => scrollToSection(e, 'welcome')} className="active">How Discord Nameplates Work</a></li>
            <li><a href="#overview" onClick={(e) => scrollToSection(e, 'overview')}>Overview & Mechanism</a></li>
            <li><a href="#how-it-works" onClick={(e) => scrollToSection(e, 'how-it-works')}>How It Works under the Hood</a></li>
            <li><a href="#supported-options" onClick={(e) => scrollToSection(e, 'supported-options')}>Supported Customization Options</a></li>
            <li><a href="#why-others-fail" onClick={(e) => scrollToSection(e, 'why-others-fail')}>Why Other Cosmetics Fail</a></li>
        </ul>
    </aside>
  );
}
