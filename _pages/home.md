---
title: "Home"
layout: homelay
permalink: /
---

<h1 class="home-hero">{{ site.name }}</h1>
<p class="home-hero-sub">{{ site.title }}, {{ site.institution }}</p>

<div class="chip-container" markdown="0">
<a href="{{ '/research' | relative_url }}" class="chip">Quantum Electrodynamics</a>
<a href="{{ '/research' | relative_url }}" class="chip">Path Integrals</a>
<a href="{{ '/research' | relative_url }}" class="chip">Superfluidity</a>
<a href="{{ '/research' | relative_url }}" class="chip">Parton Model</a>
<a href="{{ '/research' | relative_url }}" class="chip">Quantum Computing</a>
<a href="{{ '/research' | relative_url }}" class="chip">Nanotechnology</a>
</div>

Nutrient co-limitation is a quantifyable measure of microbial growth and has been shown to defy Liebig's law, the idea that the least abundant nutrient is the sole limiting factor of growth.
My work focuses on the proteomic expression of co-limitation across microbes, aiming to establish specific markers of co-limitation physiology for both marine heterotrophs and marine autotrophs. I also work on the San Pedro Ocean Time-series collecting metaproteomic data
to evaluate how metaprotoemes in open-ocean proxies change with seasonality. 
<!-- <div class="callout callout-success" markdown="0">
<div class="callout-title">{% include icon.html name="award" class="callout-icon" %} Nobel Prize in Physics, 1965</div>
<p>Awarded the Nobel Prize jointly with Julian Schwinger and Shin'ichiro Tomonaga for fundamental work in quantum electrodynamics, with deep-ploughing consequences for the physics of elementary particles.</p>
</div> -->

<!-- <div class="banner-frame" markdown="0">
<img src="{{ '/images/banner.webp' | relative_url }}" alt="Feynman diagrams" width="1400" height="449" loading="lazy">
<div class="banner-caption">Examples of Feynman diagrams. Feynman R., <em>The theory of positrons. Phys. Rev.</em> (1949)</div>
</div> -->

{% capture selected %}{% bibliography --query @*[selected=true] %}{% endcapture %}
{% if selected contains "pub-entry" %}
## Selected publications

<div class="section-card selected-pubs" markdown="0">
{{ selected }}
<p style="margin: var(--space-4) 0 0;"><a href="{{ '/publications' | relative_url }}">All publications &rarr;</a></p>
</div>
{% endif %}

## About me
I grew up on the coast of Oregon and in Kentucky before going to North Carolina for my undergraduate degree. I always had a massive love for
the ocean and 
