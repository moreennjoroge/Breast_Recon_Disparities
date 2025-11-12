#!/usr/bin/env node
/**
 * Create PowerPoint presentation with socioecological model figure
 */

const pptxgen = require('pptxgenjs');
const fs = require('fs');

async function createPresentation() {
    // Create new presentation
    const pptx = new pptxgen();
    pptx.layout = 'LAYOUT_16x9';
    pptx.author = 'Mundy et al.';
    pptx.title = 'Socioecological Model - Breast Reconstruction Study';

    // Create slide
    const slide = pptx.addSlide();

    // Add white background
    slide.background = { color: 'FFFFFF' };

    // Get image dimensions from the PNG file
    // socioecological_model.png dimensions need to be calculated
    // The figure was created at 12x6.5 inches at 300 DPI
    // PowerPoint uses inches, so we can calculate aspect ratio

    const imgWidth = 12;  // inches
    const imgHeight = 6.5;  // inches
    const aspectRatio = imgWidth / imgHeight;

    // For 16:9 slide (10 inches wide, 5.625 inches tall)
    // Make image nearly full width with some margin
    const slideWidth = 10;
    const slideHeight = 5.625;

    // Calculate dimensions to fit nicely on slide
    const margin = 0.5;
    const maxWidth = slideWidth - (2 * margin);
    const maxHeight = slideHeight - (2 * margin);

    // Scale to fit within margins while preserving aspect ratio
    let w, h;
    if (maxWidth / aspectRatio <= maxHeight) {
        w = maxWidth;
        h = w / aspectRatio;
    } else {
        h = maxHeight;
        w = h * aspectRatio;
    }

    // Center the image
    const x = (slideWidth - w) / 2;
    const y = (slideHeight - h) / 2;

    // Add the image
    slide.addImage({
        path: 'socioecological_model.png',
        x: x,
        y: y,
        w: w,
        h: h
    });

    // Add title at the top
    slide.addText('Socioecological Framework', {
        x: 0.5,
        y: 0.2,
        w: 9,
        h: 0.5,
        fontSize: 24,
        bold: true,
        color: '000000',
        align: 'center'
    });

    // Add caption at the bottom
    slide.addText('Adapted from McLeroy et al. (1988) Ecological Framework', {
        x: 0.5,
        y: slideHeight - 0.4,
        w: 9,
        h: 0.3,
        fontSize: 12,
        color: '404040',
        align: 'center',
        italic: true
    });

    // Save presentation
    await pptx.writeFile({ fileName: 'Socioecological_Model.pptx' });
    console.log('✓ PowerPoint presentation created: Socioecological_Model.pptx');
    console.log(`  Image dimensions: ${w.toFixed(2)}" × ${h.toFixed(2)}"`);
    console.log(`  Position: x=${x.toFixed(2)}", y=${y.toFixed(2)}"`);
}

createPresentation().catch(err => {
    console.error('Error creating presentation:', err);
    process.exit(1);
});
