# Homelyx Animation Prompts for Veo 3

---

## PROMPT 1: HOMEPAGE HERO - Food Delivery Exploded View

**Description:** An elegant, exploded-view animation showcasing homemade food being prepared and arranged in a premium UI-style layout. Components float apart to reveal the "layers" of a food delivery experience.

**Prompt:**

```
Generate a high-detail, warm, and inviting exploded-view animation of a homemade food delivery experience.

Keep it minimal and professional—no logos or branding. The scene should feel like a premium, storybook-style illustration of home cooking and delivery.

Elements should elevate and separate smoothly in a clean, controlled upward motion:
- A steaming pot of biryani or curry, with rice and garnishes
- Fresh vegetables, spices, and ingredients floating apart
- A woven lunch box (dabba) opening with compartments separating
- Rotis, naan bread, and flatbreads fanning out
- Small glass bottles of pickles or preserves
- A rustic wooden table surface gently floating up
- Plate, bowl, and utensils arranging themselves

Maintain perfect clarity with a warm, cream-white background (#FFF8F0) for a studio-grade look. Use soft shadows and warm orange tones (#FF8C42, #E85D04) as accents. Elements should have a hand-crafted, organic aesthetic—not overly digital or sterile.

Frame the shot so every component remains fully visible at all times—no cropping or overflow. The motion should be graceful, like a choreographed dance of food and kitchenware. Subtle particle effects of steam and spice should drift upward.

Aspect ratio: 16:9 for web hero section.
```

---

## PROMPT 2: VENDOR DASHBOARD - Kitchen to Business

**Description:** An exploded view showing the transition from home kitchen to business dashboard.

**Prompt:**

```
Generate a high-detail exploded-view animation transitioning from a home kitchen to a business dashboard.

Keep it minimal and professional—no logos or branding. Elements float apart revealing the "layers" of a food business:

From kitchen side:
- Spatula, cooking pots, spices separating
- Recipe books opening pages
- Fresh ingredients floating in organized formation

To business side:
- Mobile phone displaying order notifications
- Digital payment receipt or invoice
- Analytics chart bars rising
- Star ratings and review bubbles
- Delivery map with route line

Background: Clean white with subtle warm orange gradient accents. Glassmorphism style with soft blur and transparency on floating panels.

Frame so all elements stay fully visible, no cropping. Smooth, controlled motion like UI components being revealed. Perfect spacing between floating elements.

Aspect ratio: 16:9
```

---

## PROMPT 3: PRODUCT CARD - Artisan Food Close-up

**Description:** For product gallery or featured items, a close-up exploded view of a premium food item.

**Prompt:**

```
Generate a high-detail, mouth-watering exploded-view animation of artisan homemade food.

Keep it minimal and professional—no logos or branding. A single premium dish separates into its components with elegant motion:

- A whole rustic sourdough loaf splitting to show golden crumb interior
- Toppings and ingredients floating above: herbs, seeds, cheese shreds
- A cut断面 revealing layers of bread texture
- Side elements: butter pat, jam jar, honey drizzle

Background: Pure white studio (#FFFFFF), soft directional light like morning kitchen light. Warm tones—golden crust, cream interior, amber honey.

Frame to show all elements fully visible at all times. Slow, cinematic motion. The bread should feel alive—steam rising, textures crisp.

Aspect ratio: 1:1 (square, for product cards) or 16:9 for featured sections.
```

---

## PROMPT 4: CART/CHECKOUT - Order Assembly

**Description:** For the cart/checkout hero or empty state illustrations.

**Prompt:**

```
Generate a high-detail exploded-view animation of a food order being assembled.

Keep it minimal and professional—no logos or branding. Kitchen and delivery elements floating apart:

- Canvas tote bag opening wide
- Food containers with lids lifting off
- Aromatic steam wisps floating up
- Wooden utensils crossing in elegant X pattern
- Cloth napkin unfolding with soft motion
- Small condiments: salt shaker, spice container

Background: Warm cream (#FFF8F0) to keep inviting and organic. Subtle texture like linen or cotton. Soft shadows.

Frame all elements fully visible. Slow, controlled motion like a time-lapse of food being carefully packed.

Aspect ratio: 16:9 for hero, 4:3 for section headers.
```

---

## PROMPT 5: SLOT SELECTION - Time & Freshness

**Description:** For delivery slot selection section or time-based features.

**Prompt:**

```
Generate a high-detail exploded-view animation of a clock/time concept combined with fresh food delivery.

Keep it minimal and professional—no logos or branding.

Elements:
- Analog clock face with hour markers floating apart
- Clock hands showing morning/afternoon/evening positions
- Sun arcs moving across
- Fresh meal container with steam rising
- Leaf and herb garnishes floating in time sequence
- Map pin markers showing delivery zones
- Mobile phone showing time slot selector UI

Background: Clean white with warm gradient (soft orange to golden hour yellow). Glassmorphism panels.

Frame all visible, no cropping. Smooth motion revealing the passage of time in food freshness. Premium, editorial quality.

Aspect ratio: 16:9
```

---

## TECHNICAL NOTES FOR VIDEO GENERATION:

1. **Duration:** 5-10 seconds for hero backgrounds
2. **Resolution:** 1920x1080 (Full HD) for hero sections
3. **Frame rate:** 24fps or 30fps
4. **Format:** MP4 with transparent background option where possible
5. **Looping:** Should loop seamlessly if used as background
6. **Overlay:** Design for 40-60% opacity when used as background so text remains readable

---

## HOMELYX COLOR PALETTE FOR ANIMATIONS:

```
Primary Orange: #FF8C42
Deep Orange: #E85D04
Warm Cream: #FFF8F0
Stone Gray: #57534E
Soft Green (Fresh): #84CC16
Gold (Premium): #F59E0B
White: #FFFFFF
Off-White: #FAFAF9
```

---

## ANIMATION FILE STORAGE:

Store generated videos in:
```
public/animations/
  hero-food.mp4
  vendor-dashboard.mp4
  product-sourdough.mp4
  cart-assembly.mp4
  slot-selection.mp4
```

Fallback images (for loading or error):
```
public/images/
  hero-fallback.jpg
```