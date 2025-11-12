#!/usr/bin/env python3
"""
Create socioecological model figure for breast reconstruction manuscript.
Based on McLeroy et al. (1988) nested ovals design.
"""

from pathlib import Path

import matplotlib

# Force a headless-friendly backend so the script runs cleanly during automated builds.
matplotlib.use("Agg")  # noqa: E402

import matplotlib.pyplot as plt  # noqa: E402
from matplotlib.patches import Ellipse  # noqa: E402

# Set up the figure
fig, ax = plt.subplots(figsize=(12, 7))
ax.set_xlim(-6.5, 6.5)
ax.set_ylim(-3.5, 3.5)
ax.set_aspect('equal')
ax.axis('off')

# Define colors (darker = outer layer)
colors = {
    'systemic': '#1a5490',       # Dark blue
    'interpersonal': '#4a7bb7',  # Medium blue
    'personal': '#7fa9d6'         # Light blue
}

# Shared left edge for all layers
left_edge = -5.2

def ellipse_center(width: float) -> float:
    return left_edge + width / 2

# Create nested offset ellipses with shared left edge
# SYSTEMIC LEVEL (outermost)
systemic_width = 12.0
systemic = Ellipse(xy=(ellipse_center(systemic_width), 0), width=systemic_width, height=5.3,
                   edgecolor='white', facecolor=colors['systemic'],
                   linewidth=2.5, alpha=0.9, zorder=1)
ax.add_artist(systemic)

# INTERPERSONAL LEVEL (middle)
interpersonal_width = 8.0
interpersonal = Ellipse(xy=(ellipse_center(interpersonal_width), 0),
                        width=interpersonal_width, height=3.8,
                        edgecolor='white', facecolor=colors['interpersonal'],
                        linewidth=2.5, alpha=0.9, zorder=2)
ax.add_artist(interpersonal)

# PERSONAL LEVEL (innermost)
personal_width = 4.0
personal = Ellipse(xy=(ellipse_center(personal_width), 0), width=personal_width, height=2.4,
                   edgecolor='white', facecolor=colors['personal'],
                   linewidth=2.5, alpha=0.9, zorder=3)
ax.add_artist(personal)

# Add text labels - BLACK for visibility
# PERSONAL LEVEL (center)
personal_center_x = ellipse_center(personal_width)
ax.text(personal_center_x, 0.6, 'Personal', ha='center', va='center',
        fontsize=12, fontweight='bold', color='black', zorder=4)
ax.text(personal_center_x, 0.2, 'Individual preferences', ha='center', va='center',
        fontsize=9, color='black', zorder=4)
ax.text(personal_center_x, -0.15, 'Clinical eligibility', ha='center', va='center',
        fontsize=9, color='black', zorder=4)
ax.text(personal_center_x, -0.5, 'Body image concerns', ha='center', va='center',
        fontsize=9, color='black', zorder=4)

# INTERPERSONAL LEVEL (middle crescent)
interpersonal_center_x = ellipse_center(interpersonal_width)
ax.text(interpersonal_center_x + 0.2, 1.45, 'Interpersonal',
        ha='center', va='center', fontsize=12, fontweight='bold', color='black', zorder=4)

interpersonal_entries = [
    ('Patient-provider\ncommunication', 0.95),
    ('Information quality', 0.5),
    ('Consultation time', 0.05),
    ('Visual representation', -0.4),
    ('Communication style', -0.85),
]
for label, ypos in interpersonal_entries:
    ax.text(interpersonal_center_x + 0.25, ypos, label,
            ha='center', va='center', fontsize=9, color='black', zorder=4)

# Citation at bottom
ax.text(0, -3.2, 'Adapted from McLeroy et al. (1988) Ecological Framework',
        ha='center', va='center', fontsize=10, fontstyle='italic',
        color='#333333', zorder=4)

plt.tight_layout()

# Save in multiple formats relative to the script location
output_dir = Path(__file__).resolve().parent
output_formats = ['png', 'pdf', 'svg']
for fmt in output_formats:
    filename = output_dir / f'socioecological_model.{fmt}'
    if fmt == 'png':
        plt.savefig(filename, dpi=300, bbox_inches='tight', facecolor='white')
    else:
        plt.savefig(filename, bbox_inches='tight', facecolor='white')
    print(f"✓ Saved: {filename}")

print("\n✓ Socioecological model figure created successfully!")
print("  Clean nested oval design with black text")
print("  Formats: PNG (300 DPI), PDF, SVG")
