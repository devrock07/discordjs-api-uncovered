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

  return (
    <aside className="toc-sidebar">
        <div className="toc-title">On this page</div>
        <ul className="toc-nav">
            <li><a href="#welcome" className="active">How Discord Nameplates Work</a></li>
            <li><a href="#overview">Overview & Mechanism</a></li>
            <li><a href="#how-it-works">How It Works under the Hood</a></li>
            <li><a href="#supported-options">Supported Customization Options</a></li>
            <li><a href="#why-others-fail">Why Other Cosmetics Fail</a></li>
        </ul>
    </aside>
  );
}
