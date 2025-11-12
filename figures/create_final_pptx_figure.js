#!/usr/bin/env node
/**
 * Create PowerPoint presentation matching the human-modified version
 * Key learnings from screenshot:
 * - SOLID FILLS (not outlines) - gradient from light (inner) to dark (outer)
 * - Clean text positioning in the visible areas
 * - Professional color gradient
 */

const pptxgen = require('pptxgenjs');

async function createPresentation() {
    const pptx = new pptxgen();
    pptx.layout = 'LAYOUT_16x9';
    pptx.author = 'Mundy et al.';
    pptx.title = 'Socioecological Model - Breast Reconstruction Study';

    const slide = pptx.addSlide();
    slide.background = { color: 'FFFFFF' };

    // Correct color palette - SOLID FILLS with gradient
    const colors = {
        systemic: '5B9BD5',      // Dark blue (outermost)
        interpersonal: '9BC2E6', // Medium blue (middle)
        personal: 'DEEAF6'       // Light blue (innermost)
    };

    const slideWidth = 10;
    const slideHeight = 5.625;
    const centerX = slideWidth / 2;
    const centerY = slideHeight / 2;

    // Dimensions based on human version
    const systemicW = 8.5;
    const systemicH = 3.8;

    const interpersonalW = 6.0;
    const interpersonalH = 2.8;

    const personalW = 3.5;
    const personalH = 1.8;

    // Center-aligned positioning
    const systemicX = centerX - systemicW/2;
    const systemicY = centerY - systemicH/2;

    const interpersonalX = centerX - interpersonalW/2;
    const interpersonalY = centerY - interpersonalH/2;

    const personalX = centerX - personalW/2;
    const personalY = centerY - personalH/2;

    // SYSTEMIC LEVEL - solid dark blue fill
    slide.addShape(pptx.shapes.OVAL, {
        x: systemicX,
        y: systemicY,
        w: systemicW,
        h: systemicH,
        fill: { color: colors.systemic },
        line: { color: 'FFFFFF', width: 3 }
    });

    // INTERPERSONAL LEVEL - solid medium blue fill
    slide.addShape(pptx.shapes.OVAL, {
        x: interpersonalX,
        y: interpersonalY,
        w: interpersonalW,
        h: interpersonalH,
        fill: { color: colors.interpersonal },
        line: { color: 'FFFFFF', width: 3 }
    });

    // PERSONAL LEVEL - solid light blue fill
    slide.addShape(pptx.shapes.OVAL, {
        x: personalX,
        y: personalY,
        w: personalW,
        h: personalH,
        fill: { color: colors.personal },
        line: { color: 'FFFFFF', width: 3 }
    });

    // TEXT POSITIONING (in visible crescents)

    // Personal Level - center of innermost oval
    slide.addText([
        { text: 'Personal\n', options: { fontSize: 16, bold: true, breakLine: true } },
        { text: '\n', options: { breakLine: true } },
        { text: '•  Individual preferences\n', options: { fontSize: 11 } },
        { text: '•  Clinical eligibility\n', options: { fontSize: 11 } },
        { text: '•  Body image concerns', options: { fontSize: 11 } }
    ], {
        x: personalX,
        y: personalY,
        w: personalW,
        h: personalH,
        align: 'center',
        valign: 'middle',
        color: '000000'
    });

    // Interpersonal Level - middle crescent (right side visible area)
    slide.addText([
        { text: 'Interpersonal\n', options: { fontSize: 16, bold: true, breakLine: true } },
        { text: '\n', options: { breakLine: true } },
        { text: '•  Patient-Provider\n', options: { fontSize: 11 } },
        { text: '    Communication\n', options: { fontSize: 11 } },
        { text: '•  Information quality\n', options: { fontSize: 11 } },
        { text: '•  Consultation time\n', options: { fontSize: 11 } },
        { text: '•  Visual representation\n', options: { fontSize: 11 } },
        { text: '•  Communication style', options: { fontSize: 11 } }
    ], {
        x: centerX + 0.8,
        y: centerY - 1.2,
        w: 2.5,
        h: 2.4,
        align: 'left',
        valign: 'middle',
        color: '000000'
    });

    // Systemic Level - outer crescent (right side)
    slide.addText('Systemic', {
        x: centerX + 2.8,
        y: centerY - 1.8,
        w: 2.0,
        h: 0.4,
        fontSize: 18,
        bold: true,
        align: 'center',
        color: '000000'
    });

    // Financial Toxicity
    slide.addText([
        { text: 'Financial Toxicity\n', options: { fontSize: 14, bold: true, breakLine: true } },
        { text: '\n', options: { breakLine: true } },
        { text: '•  55% financial strain\n', options: { fontSize: 11 } },
        { text: '•  (2.3× national\n', options: { fontSize: 10, italic: true } },
        { text: '    average)\n', options: { fontSize: 10, italic: true } },
        { text: '•  Lost income\n', options: { fontSize: 11 } },
        { text: '    concerns', options: { fontSize: 11 } }
    ], {
        x: centerX + 2.5,
        y: centerY - 1.2,
        w: 2.2,
        h: 1.4,
        align: 'left',
        valign: 'top',
        color: '000000'
    });

    // Medical Mistrust
    slide.addText([
        { text: 'Medical Mistrust\n', options: { fontSize: 14, bold: true, breakLine: true } },
        { text: '\n', options: { breakLine: true } },
        { text: '•  System distrust\n', options: { fontSize: 11 } },
        { text: '    (36%)\n', options: { fontSize: 11 } },
        { text: '•  Historical context\n', options: { fontSize: 11 } },
        { text: '•  Institutional\n', options: { fontSize: 11 } },
        { text: '    barriers', options: { fontSize: 11 } }
    ], {
        x: centerX + 2.5,
        y: centerY + 0.2,
        w: 2.2,
        h: 1.4,
        align: 'left',
        valign: 'top',
        color: '000000'
    });

    // Citation
    slide.addText('Adapted from McLeroy et al. (1988) Ecological Framework', {
        x: 0.5,
        y: slideHeight - 0.5,
        w: 9,
        h: 0.3,
        fontSize: 12,
        color: '000000',
        align: 'center',
        italic: true
    });

    await pptx.writeFile({ fileName: 'Socioecological_Model_Final.pptx' });
    console.log('✓ Fixed PowerPoint created: Socioecological_Model_Final.pptx');
    console.log('  - SOLID FILLS with gradient (light → dark)');
    console.log('  - Text positioned in visible crescents');
    console.log('  - Matches human-modified screenshot');
}

createPresentation().catch(err => {
    console.error('Error creating presentation:', err);
    process.exit(1);
});
