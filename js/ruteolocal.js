'use strict';

document.addEventListener("DOMContentLoaded", function () {

    (function() {
        const isLocal = location.hostname === "127.0.0.1" || location.hostname === "localhost";
        if (!isLocal) return;

        document.querySelectorAll('a[href]').forEach(a => {
        const hrefAttr = a.getAttribute('href');
        if (!hrefAttr) return;

        // Ignorar anchors, protocolos especiales y enlaces que ya son .html o tienen extensión
        const lower = hrefAttr.toLowerCase();
        if (
            lower.startsWith('#') ||
            lower.startsWith('mailto:') ||
            lower.startsWith('tel:') ||
            lower.startsWith('javascript:') ||
            lower.startsWith('http://') ||
            lower.startsWith('https://')
        ) return;

        try {
            // Resolve relative URLs against current location
            const resolved = new URL(hrefAttr, location.href);

            // Si es a otro host, ignorar
            if (resolved.host !== location.host) return;

            // Si la ruta ya tiene extensión (p.ej. .html, .css, .pdf), no tocar
            const pathname = resolved.pathname; // p.ej. /carpeta/contacto
            const lastSegment = pathname.substring(pathname.lastIndexOf('/') + 1);
            if (lastSegment.includes('.')) return; // ya tiene extensión -> skip

            // Construir nueva ruta
            let newPath;
            if (pathname.endsWith('/')) {
            newPath = pathname + 'index.html';
            } else {
            newPath = pathname + '.html';
            }

            // Mantener search + hash del href original
            const newHref = newPath + resolved.search + resolved.hash;

            // Setear el href (usar setAttribute para no convertir al absolute automáticamente en todos los navegadores)
            // Pero como estamos en localhost con un path absoluto, Live Server lo servirá correctamente.
            a.setAttribute('href', newHref);
        } catch (err) {
            // Si URL() falla por alguna razón, no hacer nada
            console.warn('router-local: no se pudo resolver href', hrefAttr, err);
        }
        });
    })();

});
