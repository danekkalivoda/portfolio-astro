import Alpine from 'alpinejs'
import intersect from '@alpinejs/intersect'

import app from "../js/components/app";
import { initHeader } from "../js/components/header.js";

Alpine.plugin(intersect)
window.Alpine = Alpine

app(() => {
    initHeader();
});

Alpine.start()
