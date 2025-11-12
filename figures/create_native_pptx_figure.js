#!/usr/bin/env node
/**
 * Create PowerPoint presentation with socioecological model using native shapes and text
 */

const pptxgen = require('pptxgenjs');

async function createPresentation() {
    const pptx = new pptxgen();
    pptx.layout = 'LAYOUT_16x9';
    pptx.author = 'Mundy et al.';
    pptx.title = 'Socioecological Model - Breast Reconstruction Study';

    const slide = pptx.addSlide();
    slide.background = { color: 'FFFFFF' };

    // Color palette (matching Python figure)
    const colors = {
        systemic: '2e5090',      // Dark blue
        interpersonal: '4a7bb7', // Medium blue
        personal: '7fa9d6'       // Light blue
    };

    // Slide dimensions for 16:9 (in inches)
    const slideWidth = 10;
    const slideHeight = 5.625;

    // Calculate center of slide
    const centerX = slideWidth / 2;
    const centerY = slideHeight / 2;

    // Define ellipse dimensions (width, height in inches)
    // Making them proportional to the Python version
    const systemicW = 7.5;
    const systemicH = 3.5;

    const interpersonalW = 5.0;
    const interpersonalH = 2.4;

    const personalW = 3.2;
    const personalH = 1.6;

    // Calculate offset to create nested effect (ovals share left edge)
    const systemicX = centerX - systemicW/2 + 0.5;
    const interpersonalX = centerX - interpersonalW/2 - 0.5;
    const personalX = centerX - personalW/2 - 1.2;

    // SYSTEMIC LEVEL (outermost oval)
    slide.addShape(pptx.shapes.OVAL, {
        x: systemicX,
        y: centerY - systemicH/2,
        w: systemicW,
        h: systemicH,
        fill: { color: colors.systemic },
        line: { color: 'FFFFFF', width: 3 }
    });

    // INTERPERSONAL LEVEL (middle oval)
    slide.addShape(pptx.shapes.OVAL, {
        x: interpersonalX,
        y: centerY - interpersonalH/2,
        w: interpersonalW,
        h: interpersonalH,
        fill: { color: colors.interpersonal },
        line: { color: 'FFFFFF', width: 3 }
    });

    // PERSONAL LEVEL (innermost oval)
    slide.addShape(pptx.shapes.OVAL, {
        x: personalX,
        y: centerY - personalH/2,
        w: personalW,
        h: personalH,
        fill: { color: colors.personal },
        line: { color: 'FFFFFF', width: 3 }
    });

    // Add text labels
    // PERSONAL LEVEL TEXT (center)
    slide.addText('Personal', {
        x: personalX,
        y: centerY - 0.6,
        w: personalW,
        h: 0.3,
        fontSize: 14,
        bold: true,
        color: '000000',
        align: 'center'
    });

    slide.addText('Individual preferences', {
        x: personalX,
        y: centerY - 0.2,
        w: personalW,
        h: 0.25,
        fontSize: 10,
        color: '000000',
        align: 'center'
    });

    slide.addText('Clinical eligibility', {
        x: personalX,
        y: centerY + 0.05,
        w: personalW,
        h: 0.25,
        fontSize: 10,
        color: '000000',
        align: 'center'
    });

    slide.addText('Body image concerns', {
        x: personalX,
        y: centerY + 0.3,
        w: personalW,
        h: 0.25,
        fontSize: 10,
        color: '000000',
        align: 'center'
    });

    // INTERPERSONAL LEVEL TEXT (middle crescent)
    const interX = centerX + 0.3;

    slide.addText('Interpersonal', {
        x: interX - 1.5,
        y: centerY - 1.15,
        w: 3,
        h: 0.3,
        fontSize: 14,
        bold: true,
        color: '000000',
        align: 'center'
    });

    slide.addText('Patient-Provider Communication', {
        x: interX - 1.5,
        y: centerY - 0.75,
        w: 3,
        h: 0.25,
        fontSize: 11,
        color: '000000',
        align: 'center'
    });

    slide.addText('Information quality', {
        x: interX - 1.5,
        y: centerY - 0.4,
        w: 3,
        h: 0.2,
        fontSize: 10,
        color: '000000',
        align: 'center'
    });

    slide.addText('Consultation time', {
        x: interX - 1.5,
        y: centerY - 0.15,
        w: 3,
        h: 0.2,
        fontSize: 10,
        color: '000000',
        align: 'center'
    });

    slide.addText('Visual representation', {
        x: interX - 1.5,
        y: centerY + 0.1,
        w: 3,
        h: 0.2,
        fontSize: 10,
        color: '000000',
        align: 'center'
    });

    slide.addText('Communication style', {
        x: interX - 1.5,
        y: centerY + 0.35,
        w: 3,
        h: 0.2,
        fontSize: 10,
        color: '000000',
        align: 'center'
    });

    // SYSTEMIC LEVEL TEXT (outer crescent - right side)
    const sysX = centerX + 2.2;

    slide.addText('Systemic', {
        x: sysX - 1.2,
        y: centerY - 1.65,
        w: 2.4,
        h: 0.3,
        fontSize: 15,
        bold: true,
        color: '000000',
        align: 'center'
    });

    // Financial Toxicity section
    slide.addText('Financial Toxicity', {
        x: sysX - 1.2,
        y: centerY - 1.2,
        w: 2.4,
        h: 0.3,
        fontSize: 13,
        bold: true,
        color: '000000',
        align: 'center'
    });

    slide.addText('55% financial strain', {
        x: sysX - 1.2,
        y: centerY - 0.85,
        w: 2.4,
        h: 0.2,
        fontSize: 10,
        color: '000000',
        align: 'center'
    });

    slide.addText('(2.3× national average)', {
        x: sysX - 1.2,
        y: centerY - 0.6,
        w: 2.4,
        h: 0.2,
        fontSize: 9,
        italic: true,
        color: '000000',
        align: 'center'
    });

    slide.addText('Lost income concerns', {
        x: sysX - 1.2,
        y: centerY - 0.3,
        w: 2.4,
        h: 0.2,
        fontSize: 10,
        color: '000000',
        align: 'center'
    });

    // Medical Mistrust section
    slide.addText('Medical Mistrust', {
        x: sysX - 1.2,
        y: centerY + 0.1,
        w: 2.4,
        h: 0.3,
        fontSize: 13,
        bold: true,
        color: '000000',
        align: 'center'
    });

    slide.addText('System distrust (36%)', {
        x: sysX - 1.2,
        y: centerY + 0.4,
        w: 2.4,
        h: 0.2,
        fontSize: 10,
        color: '000000',
        align: 'center'
    });

    slide.addText('Historical context', {
        x: sysX - 1.2,
        y: centerY + 0.65,
        w: 2.4,
        h: 0.2,
        fontSize: 10,
        color: '000000',
        align: 'center'
    });

    slide.addText('Institutional barriers', {
        x: sysX - 1.2,
        y: centerY + 0.9,
        w: 2.4,
        h: 0.2,
        fontSize: 10,
        color: '000000',
        align: 'center'
    });

    // Add citation at bottom
    slide.addText('Adapted from McLeroy et al. (1988) Ecological Framework', {
        x: 0.5,
        y: slideHeight - 0.4,
        w: 9,
        h: 0.3,
        fontSize: 11,
        color: '404040',
        align: 'center',
        italic: true
    });

    // Save presentation
    await pptx.writeFile({ fileName: 'Socioecological_Model_Native.pptx' });
    console.log('✓ PowerPoint presentation created with native shapes: Socioecological_Model_Native.pptx');
    console.log('  - 3 nested ovals drawn using PowerPoint shapes');
    console.log('  - All text added as native PowerPoint text boxes');
    console.log('  - Colors: Systemic (dark blue), Interpersonal (medium blue), Personal (light blue)');
}

createPresentation().catch(err => {
    console.error('Error creating presentation:', err);
    process.exit(1);
});
