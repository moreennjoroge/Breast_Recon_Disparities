#!/usr/bin/env node
/**
 * Exact copy of human-modified version using extracted coordinates
 */

const pptxgen = require('pptxgenjs');

async function createPresentation() {
    const pptx = new pptxgen();
    pptx.layout = 'LAYOUT_16x9';

    const slide = pptx.addSlide();
    slide.background = { color: 'E7E6E6' };  // Light gray background like screenshot

    // EXACT OVAL POSITIONS from human version
    // Outermost (Systemic) - darkest blue
    slide.addShape(pptx.shapes.OVAL, {
        x: 1.75,
        y: 0.87,
        w: 8.91,
        h: 3.92,
        fill: { color: '5B9BD5' },  // Dark blue
        line: { color: 'FFFFFF', width: 3 }
    });

    // Middle (Interpersonal) - medium blue
    slide.addShape(pptx.shapes.OVAL, {
        x: 1.79,
        y: 1.40,
        w: 5.00,
        h: 2.88,
        fill: { color: '9BC2E6' },  // Medium blue
        line: { color: 'FFFFFF', width: 3 }
    });

    // Inner (Personal) - lightest blue
    slide.addShape(pptx.shapes.OVAL, {
        x: 1.81,
        y: 1.97,
        w: 2.40,
        h: 1.60,
        fill: { color: 'DEEAF6' },  // Light blue
        line: { color: 'FFFFFF', width: 3 }
    });

    // EXACT TEXT POSITIONS from human version

    // Personal (BOTTOM CENTER)
    slide.addText('Personal', {
        x: 1.24,
        y: 3.84,
        w: 1.33,
        h: 0.30,
        fontSize: 16,
        bold: true,
        align: 'center',
        color: '000000'
    });

    slide.addText('•  Individual preferences\n•  Clinical eligibility\n•  Body image concerns', {
        x: 1.24,
        y: 4.11,
        w: 2.25,
        h: 0.78,
        fontSize: 11,
        align: 'left',
        color: '000000'
    });

    // Interpersonal (TOP LEFT)
    slide.addText('Interpersonal', {
        x: 0.57,
        y: 0.69,
        w: 1.85,
        h: 0.30,
        fontSize: 16,
        bold: true,
        align: 'center',
        color: '000000'
    });

    slide.addText('•  Patient-Provider\n    Communication\n•  Information quality\n•  Consultation time\n•  Visual representation\n•  Communication style', {
        x: 0.64,
        y: 0.83,
        w: 2.31,
        h: 1.59,
        fontSize: 11,
        align: 'left',
        color: '000000'
    });

    // Systemic (CENTER RIGHT)
    slide.addText('Systemic', {
        x: 6.33,
        y: 1.77,
        w: 2.59,
        h: 0.39,
        fontSize: 18,
        bold: true,
        align: 'center',
        color: '000000'
    });

    // Financial Toxicity (TOP RIGHT)
    slide.addText('Financial Toxicity', {
        x: 7.75,
        y: 0.75,
        w: 2.06,
        h: 0.30,
        fontSize: 14,
        bold: true,
        align: 'left',
        color: '000000'
    });

    slide.addText('•  55% financial strain\n•  (2.3× national average)\n•  Lost income concerns', {
        x: 7.87,
        y: 1.11,
        w: 2.06,
        h: 0.78,
        fontSize: 11,
        align: 'left',
        color: '000000'
    });

    // Medical Mistrust (BOTTOM RIGHT)
    slide.addText('Medical Mistrust', {
        x: 7.64,
        y: 4.33,
        w: 1.69,
        h: 0.30,
        fontSize: 14,
        bold: true,
        align: 'left',
        color: '000000'
    });

    slide.addText('•  System distrust (36%)\n•  Historical context\n•  Institutional barriers', {
        x: 7.57,
        y: 4.72,
        w: 2.05,
        h: 0.91,
        fontSize: 11,
        align: 'left',
        color: '000000'
    });

    // Citation (BOTTOM)
    slide.addText('Adapted from McLeroy et al. (1988) Ecological Framework', {
        x: 0.50,
        y: 5.22,
        w: 9.00,
        h: 0.30,
        fontSize: 12,
        align: 'center',
        italic: true,
        color: '000000'
    });

    await pptx.writeFile({ fileName: 'Socioecological_Model_Exact.pptx' });
    console.log('✓ Created using EXACT positions from your hand-modified version');
}

createPresentation().catch(err => {
    console.error('Error:', err);
    process.exit(1);
});
