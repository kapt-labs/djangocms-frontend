/*
 * Copyright (c) 2013, Divio AG
 * Licensed under BSD
 * http://github.com/divio/djangocms-boilerplate-webpack
 */

// import 'bootstrap/js/dist/alert'
import $ from 'jquery';
import ContextGroup from 'components/context-group';
import PreviewGenerator from 'components/preview-generator';
import ButtonGroup from 'components/button-group';

window.djangoCMSFrontend = {
    $,
};

$(() => {
    // general color context without auto alignment
    // ALERT, BADGE, CONTAINER
    new ContextGroup({
        select: '#id_alert_context, #id_badge_context, #id_container_context',
        takeClassesFromSelectValues: true,
    });
    // general color context with auto alignment
    // CARD
    new ContextGroup({
        select: '#id_card_context',
        takeClassesFromSelectValues: true,
        extraClass: 'bootstrap5-button-group-context-colors',
    });
    new ContextGroup({
        select: '#id_card_text_color',
        takeClassesFromSelectValues: true,
        extraClass: 'bootstrap5-button-group-context-colors',
    });
    // simple buttons
    // CARD
    new ContextGroup({
        select: '#id_inner_type',
        classes: [
            'btn-secondary', 'btn-secondary', 'btn-secondary',
        ],
    });
    // LIST
    new ContextGroup({
        select: '#id_list_context',
        takeClassesFromSelectValues: true,
    });
    // LINK
    new ContextGroup({
        select: '#id_link_context',
        takeClassesFromSelectValues: true,
        extraClass: 'bootstrap5-button-group-context-colors',
    });
    new ContextGroup({
        select: '#id_link_size',
        classes: [
            'btn-sm btn-secondary', 'btn-secondary', 'btn-secondary btn-lg',
        ],
        extraClass: 'bootstrap5-button-group-context-size',
    });

    // IMAGE PREVIEW
    if ($('.djangocms-frontend-link').length) {
        new PreviewGenerator({
            container: '.djangocms-frontend-link',
            title: $('.djangocms-frontend-link').data().preview,
        });
    }

    // adds alignment button
    // BLOCKQUOTE, CARD, FIGURE
    if (
        $('#id_quote_alignment').length ||
        $('#id_card_alignment').length ||
        $('#id_figure_alignment').length
    ) {
        const static_url = $('.djangocms-frontend').data('static');

        // alignment
        new ButtonGroup({
            static: static_url,
            select: '#id_quote_alignment, #id_card_alignment, #id_figure_alignment',
            icons: ['align-reset', 'flex-content-start', 'flex-content-center', 'flex-content-end'],
        });
    }
});
