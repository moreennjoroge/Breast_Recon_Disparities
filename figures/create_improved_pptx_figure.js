#!/usr/bin/env node
/**
 * Create PowerPoint presentation with socioecological model
 * Improved version incorporating human modifications:
 * - Consolidated text boxes (multi-line instead of separate boxes)
 * - Adjusted oval dimensions based on human refinements
 * - Better proportions for visual balance
 */

const pptxgen = require('pptxgenjs');

async function createPresentation() {
    const pptx = new pptxgen();
    pptx.layout = 'LAYOUT_16x9';
    pptx.author = 'Mundy et al.';
    pptx.title = 'Socioecological Model - Breast Reconstruction Study';

    const slide = pptx.addSlide();
    slide.background = { color: 'FFFFFF' };

    // Color palette (outline only, no fill)
    const colors = {
        systemic: '2e5090',
        interpersonal: '4a7bb7',
        personal: '7fa9d6'
    };

    const slideWidth = 10;
    const slideHeight = 5.625;
    const centerX = slideWidth / 2;
    const centerY = slideHeight / 2;

    // Adjusted dimensions based on human modifications
    // Human made systemic wider (+1.41") and taller (+0.42")
    const systemicW = 8.91;  // was 7.5, now 7.5 + 1.41
    const systemicH = 3.92;  // was 3.5, now 3.5 + 0.42

    // Human made interpersonal taller (+0.48")
    const interpersonalW = 5.0;
    const interpersonalH = 2.88; // was 2.4, now 2.4 + 0.48

    // Human made personal narrower (-0.80")
    const personalW = 2.4;   // was 3.2, now 3.2 - 0.8
    const personalH = 1.6;

    // Position adjustments
    const systemicX = centerX - systemicW/2 + 0.5;
    const interpersonalX = centerX - interpersonalW/2 - 0.5;
    const personalX = centerX - personalW/2 - 1.2;

    // SYSTEMIC LEVEL (outline only, no fill)
    slide.addShape(pptx.shapes.OVAL, {
        x: systemicX,
        y: centerY - systemicH/2,
        w: systemicW,
        h: systemicH,
        fill: { type: 'solid', color: 'FFFFFF', transparency: 100 },
        line: { color: colors.systemic, width: 3 }
    });

    // INTERPERSONAL LEVEL (outline only)
    slide.addShape(pptx.shapes.OVAL, {
        x: interpersonalX,
        y: centerY - interpersonalH/2,
        w: interpersonalW,
        h: interpersonalH,
        fill: { type: 'solid', color: 'FFFFFF', transparency: 100 },
        line: { color: colors.interpersonal, width: 3 }
    });

    // PERSONAL LEVEL (outline only)
    slide.addShape(pptx.shapes.OVAL, {
        x: personalX,
        y: centerY - personalH/2,
        w: personalW,
        h: personalH,
        fill: { type: 'solid', color: 'FFFFFF', transparency: 100 },
        line: { color: colors.personal, width: 3 }
    });

    // CONSOLIDATED TEXT APPROACH (learning from human)

    // Personal Level - single text box with multiple lines
    slide.addText([
        { text: 'Personal\n', options: { fontSize: 14, bold: true, breakLine: true } },
        { text: 'Individual preferences\n', options: { fontSize: 10 } },
        { text: 'Clinical eligibility\n', options: { fontSize: 10 } },
        { text: 'Body image concerns', options: { fontSize: 10 } }
    ], {
        x: personalX,
        y: centerY - 0.7,
        w: personalW,
        h: 1.4,
        align: 'center',
        valign: 'middle'
    });

    // Interpersonal Level - single consolidated text box
    const interX = centerX + 0.3;
    slide.addText([
        { text: 'Interpersonal\n', options: { fontSize: 14, bold: true, breakLine: true } },
        { text: 'Patient-Provider Communication\n', options: { fontSize: 11, bold: true, breakLine: true } },
        { text: 'Information quality\n', options: { fontSize: 10 } },
        { text: 'Consultation time\n', options: { fontSize: 10 } },
        { text: 'Visual representation\n', options: { fontSize: 10 } },
        { text: 'Communication style', options: { fontSize: 10 } }
    ], {
        x: interX - 1.5,
        y: centerY - 1.3,
        w: 3,
        h: 2.6,
        align: 'center',
        valign: 'middle'
    });

    // Systemic Level - consolidated text boxes for each section
    const sysX = centerX + 2.5;

    // Header
    slide.addText('Systemic', {
        x: sysX - 1.2,
        y: centerY - 1.8,
        w: 2.4,
        h: 0.3,
        fontSize: 15,
        bold: true,
        align: 'center'
    });

    // Financial Toxicity section - consolidated
    slide.addText([
        { text: 'Financial Toxicity\n', options: { fontSize: 13, bold: true, breakLine: true } },
        { text: '55% financial strain\n', options: { fontSize: 10 } },
        { text: '(2.3× national average)\n', options: { fontSize: 9, italic: true } },
        { text: 'Lost income concerns', options: { fontSize: 10 } }
    ], {
        x: sysX - 1.2,
        y: centerY - 1.35,
        w: 2.4,
        h: 1.0,
        align: 'center',
        valign: 'middle'
    });

    // Medical Mistrust section - consolidated
    slide.addText([
        { text: 'Medical Mistrust\n', options: { fontSize: 13, bold: true, breakLine: true } },
        { text: 'System distrust (36%)\n', options: { fontSize: 10 } },
        { text: 'Historical context\n', options: { fontSize: 10 } },
        { text: 'Institutional barriers', options: { fontSize: 10 } }
    ], {
        x: sysX - 1.2,
        y: centerY + 0.05,
        w: 2.4,
        h: 1.0,
        align: 'center',
        valign: 'middle'
    });

    // Citation
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
    await pptx.writeFile({ fileName: 'Socioecological_Model_Improved.pptx' });
    console.log('✓ Improved PowerPoint created: Socioecological_Model_Improved.pptx');
    console.log('  Improvements based on human modifications:');
    console.log('  - Consolidated text boxes (multi-line instead of 20+ separate boxes)');
    console.log('  - Adjusted oval dimensions (systemic wider/taller, personal narrower)');
    console.log('  - Outline-only ovals (no solid fill)');
    console.log('  - Reduced from 23 to ~10 shapes for easier editing');
}

createPresentation().catch(err => {
    console.error('Error creating presentation:', err);
    process.exit(1);
});
