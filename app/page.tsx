"use client"

import { useEffect, useRef, useState, type CSSProperties, type FormEvent, type PointerEvent as ReactPointerEvent } from "react"

const navItems = [
  ["About", "#about"],
  ["Skills", "#skills"],
  ["Projects", "#projects"],
  ["Education", "#education"],
  ["Experience", "#experience"],
  ["Resume", "#resume"],
  ["Contact", "#contact"],
]

const skills = {
  Languages: ["Java", "Python", "SQL", "TypeScript", "JavaScript", "R", "HTML", "CSS"],
  "AI / ML": ["PyTorch", "TensorFlow", "Scikit-Learn", "OpenCV", "Pandas", "NumPy", "FAISS", "LoRA / QLoRA"],
  Frameworks: ["React", "FastAPI", "Node.js", "Spring Boot", "Cypress", "JUnit"],
  Platforms: ["AWS Lambda", "DynamoDB", "EventBridge", "S3", "Git", "Linux", "MySQL", "PostgreSQL"],
}

const projects = [
  {
    name: "Deep Learning Projects",
    repo: "https://github.com/zchen868/deep-learning-projects",
    summary: "Neural networks from scratch, CNNs, Transformers, GANs, and diffusion models.",
    tags: ["PyTorch", "Transformers", "GAN", "Diffusion", "CNN"],
  },
  {
    name: "Natural Language Processing Projects",
    repo: "https://github.com/zchen868/natural-language-processing-projects",
    summary: "Logistic regression, neural text classification, attention models, and Transformer machine translation with preserved model weights.",
    tags: ["NLP", "Attention", "Machine Translation", "Git LFS"],
  },
  {
    name: "Machine Learning Security Projects",
    repo: "https://github.com/zchen868/machine-learning-security-projects",
    summary: "Course projects exploring ML security topics such as adversarial behavior, poisoning, and robustness.",
    tags: ["ML Security", "Python", "Adversarial ML"],
  },
  {
    name: "Computer Vision Projects",
    repo: "https://github.com/zchen868/Computer-Vision",
    summary: "Image filtering, feature matching, scene recognition, camera geometry, and recognition pipelines.",
    tags: ["Computer Vision", "OpenCV", "PyTorch"],
  },
  {
    name: "Database Systems: Drone Dispatch",
    repo: "https://github.com/zchen868/database-systems-drone-dispatch",
    summary: "MySQL schema, stored procedures, and JavaFX prototype for a drone-based retail dispatch system.",
    tags: ["MySQL", "Stored Procedures", "JavaFX", "JDBC"],
  },
  {
    name: "COVID Case Fatality Visualizer",
    repo: "https://github.com/zchen868/covid-case-fatality-visualizer",
    summary: "Java GUI for comparing COVID-19 case fatality ratios across states and demographic groups.",
    tags: ["Java", "GUI", "Data Visualization"],
  },
  {
    name: "Finance Textbook LLM Evaluation",
    repo: "https://github.com/zchen868/finance-textbook-llm-evaluation",
    summary: "Financial reasoning benchmark built from open-source textbook material for evaluating LLM performance.",
    tags: ["LLM Evaluation", "Benchmark", "Python"],
  },
  {
    name: "Data Visual Analytics Projects",
    repo: "https://github.com/zchen868/data-visual-analytics-projects",
    summary: "Visualization and analytics coursework projects combining data processing, dashboards, and analytical storytelling.",
    tags: ["Data Visualization", "Analytics", "Python"],
  },
]

const experience = [
  {
    role: "AI Evaluation Engineer Intern",
    company: "Powabase",
    location: "Remote",
    date: "Apr 2025 - Present",
    points: [
      "Built an Agentic AI evaluation platform for knowledge-base integration, agent orchestration, benchmark execution, and LLM-as-a-Judge evaluation.",
      "Supported 500+ benchmark samples and reduced manual evaluation effort by approximately 90%.",
      "Improved agent answer accuracy by 30% through benchmark-driven prompt engineering.",
    ],
  },
  {
    role: "AI Application Engineer Intern",
    company: "Georgia Tech Infrastructure and Sustainability Department",
    location: "Atlanta, GA",
    date: "Aug 2025 - Dec 2025",
    points: [
      "Developed an enterprise AI assistant with Microsoft Copilot Studio across HR, IT, equipment requests, and internal service workflows.",
      "Built 50+ conversational workflows with trigger phrases, variables, forms, and conditional routing.",
      "Created JSONL fine-tuning datasets for Azure OpenAI, improving workflow routing accuracy by approximately 9%.",
    ],
  },
  {
    role: "Software Developer Intern",
    company: "Amazon",
    location: "Boston, MA",
    date: "Jul 2023 - Dec 2023",
    points: [
      "Developed a real-time optimization system for fulfillment-center package routing and fluid lane assignment.",
      "Built an event-driven pipeline using AWS Lambda, EventBridge, SQS, DynamoDB, and CloudWatch.",
      "Implemented Cypress UI regression testing and integrated it into AWS-based CI/CD workflows.",
    ],
  },
  {
    role: "Software Developer Intern",
    company: "Boke Technology",
    location: "Shanghai, China",
    date: "Jun 2024 - Aug 2024",
    points: [
      "Built React and TypeScript modules for tournament, player, leaderboard, and match result management.",
      "Integrated REST APIs and built Recharts dashboards for tournament analytics.",
    ],
  },
  {
    role: "Product Management Intern",
    company: "MessageGears",
    location: "Atlanta, GA",
    date: "Jan 2023 - May 2023",
    points: [
      "Authored PRDs and user stories, created wireframes, coordinated Agile delivery, and supported UAT for product releases.",
    ],
  },
]

const education = [
  {
    degree: "Master of Science in Computer Science",
    focus: "Machine Learning",
    school: "Georgia Institute of Technology",
    location: "Atlanta, GA",
    date: "Dec 2025",
    details: [
      "GPA 4.0",
      "Relevant Coursework: Deep Learning, Natural Language Processing, Data and Visual Analytics",
    ],
  },
  {
    degree: "Bachelor of Science in Computer Science",
    school: "Georgia Institute of Technology",
    location: "Atlanta, GA",
    date: "Dec 2024",
    details: [
      "Relevant Coursework: Computer Organization & Program, Computer Vision, Data Structures & Algorithms",
    ],
  },
]

type ContactStatus = "idle" | "loading" | "success"

const floatingPetals = [
  { x: 5, y: 8, size: 0.86, tint: "pink" },
  { x: 23, y: 14, size: 0.7, tint: "mint" },
  { x: 40, y: 11, size: 0.64, tint: "white" },
  { x: 67, y: 8, size: 0.68, tint: "mint" },
  { x: 86, y: 19, size: 0.58, tint: "pink" },
  { x: 12, y: 35, size: 0.72, tint: "white" },
  { x: 34, y: 40, size: 0.82, tint: "mint" },
  { x: 73, y: 37, size: 0.62, tint: "pink" },
  { x: 91, y: 48, size: 0.78, tint: "white" },
  { x: 7, y: 64, size: 0.74, tint: "pink" },
  { x: 27, y: 72, size: 0.7, tint: "white" },
  { x: 55, y: 68, size: 0.82, tint: "mint" },
  { x: 78, y: 76, size: 0.66, tint: "white" },
  { x: 94, y: 83, size: 0.72, tint: "pink" },
  { x: 17, y: 90, size: 0.86, tint: "mint" },
  { x: 63, y: 92, size: 0.62, tint: "white" },
]

function usePortfolioEffects() {
  useEffect(() => {
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    )

    revealItems.forEach((item) => observer.observe(item))

    const glowItems = Array.from(document.querySelectorAll<HTMLElement>(".skill-card, .project-card, .timeline-item, .resume-band, .contact-form"))
    const onPointerMove = (event: PointerEvent) => {
      const target = event.currentTarget as HTMLElement
      const rect = target.getBoundingClientRect()
      target.style.setProperty("--pointer-x", `${event.clientX - rect.left}px`)
      target.style.setProperty("--pointer-y", `${event.clientY - rect.top}px`)
    }

    glowItems.forEach((item) => item.addEventListener("pointermove", onPointerMove))

    return () => {
      observer.disconnect()
      glowItems.forEach((item) => item.removeEventListener("pointermove", onPointerMove))
    }
  }, [])
}

function LegacyWaterRefraction() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const layerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let active = true
    let frame = 0
    let time = 0
    const pointer = { x: 0.5, y: 0.5, strength: 0 }
    const sim = {
      width: 300,
      height: 180,
      current: new Float32Array(300 * 180),
      previous: new Float32Array(300 * 180),
    }
    const ripples: Array<{ x: number; y: number; age: number; life: number; radius: number; strength: number }> = []
    const sparkles: Array<{ x: number; y: number; size: number; phase: number; speed: number }> = []
    const petals: Array<{
      x: number
      y: number
      size: number
      angle: number
      spin: number
      vx: number
      vy: number
      alpha: number
      phase: number
      tint: string
    }> = []
    const context = canvas.getContext("2d", { alpha: true })
    const image = new Image()
    image.src = "/spring-water-ripples.png?v=5"

    if (!context) return

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      const width = window.innerWidth
      const height = window.innerHeight
      canvas.width = Math.round(width * pixelRatio)
      canvas.height = Math.round(height * pixelRatio)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      context.imageSmoothingEnabled = true
      context.imageSmoothingQuality = "high"
      resizeSim(width, height)
      if (petals.length === 0) seedPetals(width, height)
      if (sparkles.length === 0) seedSparkles(width, height)
    }

    const resizeSim = (width: number, height: number) => {
      const nextHeight = Math.max(130, Math.min(360, Math.round(sim.width * height / width)))
      if (nextHeight === sim.height) return
      sim.height = nextHeight
      sim.current = new Float32Array(sim.width * sim.height)
      sim.previous = new Float32Array(sim.width * sim.height)
    }

    const dropWater = (x: number, y: number, radius: number, strength: number) => {
      const gridX = (x / window.innerWidth) * sim.width
      const gridY = (y / window.innerHeight) * sim.height
      const radiusSquared = radius * radius
      const x0 = Math.max(1, Math.floor(gridX - radius))
      const x1 = Math.min(sim.width - 2, Math.ceil(gridX + radius))
      const y0 = Math.max(1, Math.floor(gridY - radius))
      const y1 = Math.min(sim.height - 2, Math.ceil(gridY + radius))

      for (let gy = y0; gy <= y1; gy += 1) {
        for (let gx = x0; gx <= x1; gx += 1) {
          const dx = gx - gridX
          const dy = gy - gridY
          const distanceSquared = dx * dx + dy * dy
          if (distanceSquared < radiusSquared) {
            const falloff = Math.cos((Math.sqrt(distanceSquared) / radius) * Math.PI * 0.5)
            sim.current[gy * sim.width + gx] += strength * falloff * falloff
          }
        }
      }
    }

    const stepWater = () => {
      const damping = 0.979
      const { width, height, current, previous } = sim
      for (let y = 1; y < height - 1; y += 1) {
        const row = y * width
        for (let x = 1; x < width - 1; x += 1) {
          const index = row + x
          const value = (current[index - 1] + current[index + 1] + current[index - width] + current[index + width]) * 0.5 - previous[index]
          previous[index] = value * damping
        }
      }
      const next = sim.current
      sim.current = sim.previous
      sim.previous = next
    }

    const waterGradientAt = (normalizedX: number, normalizedY: number) => {
      const x = Math.max(1, Math.min(sim.width - 2, Math.floor(normalizedX * sim.width)))
      const y = Math.max(1, Math.min(sim.height - 2, Math.floor(normalizedY * sim.height)))
      const index = y * sim.width + x
      return {
        dx: sim.current[index + 1] - sim.current[index - 1],
        dy: sim.current[index + sim.width] - sim.current[index - sim.width],
        h: sim.current[index],
      }
    }

    const seedPetals = (width: number, height: number) => {
      const tints = ["rgba(255, 196, 228,", "rgba(255, 255, 255,", "rgba(201, 246, 239,", "rgba(231, 214, 255,"]
      const count = Math.max(16, Math.min(28, Math.round(width / 58)))
      for (let i = 0; i < count; i += 1) {
        petals.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: 20 + Math.random() * 44,
          angle: Math.random() * Math.PI * 2,
          spin: (Math.random() - 0.5) * 0.012,
          vx: 0.12 + Math.random() * 0.28,
          vy: -0.05 + Math.random() * 0.12,
          alpha: 0.38 + Math.random() * 0.42,
          phase: Math.random() * Math.PI * 2,
          tint: tints[i % tints.length],
        })
      }
    }

    const seedSparkles = (width: number, height: number) => {
      const count = Math.max(22, Math.min(54, Math.round(width / 32)))
      for (let i = 0; i < count; i += 1) {
        sparkles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: 1.4 + Math.random() * 3.8,
          phase: Math.random() * Math.PI * 2,
          speed: 0.7 + Math.random() * 1.6,
        })
      }
    }

    let prevX = 0
    let prevY = 0
    let lastRippleX = -1000
    let lastRippleY = -1000
    let lastRippleTime = 0
    let lastExternalRippleX = -1000
    let lastExternalRippleY = -1000
    let lastExternalRippleTime = 0
    let ambientDropTime = 0.8
    const onPointerMove = (event: MouseEvent | PointerEvent) => {
      canvas.dataset.moveCount = String(Number(canvas.dataset.moveCount || "0") + 1)
      const speed = Math.hypot(event.clientX - prevX, event.clientY - prevY)
      pointer.x = event.clientX / window.innerWidth
      pointer.y = event.clientY / window.innerHeight
      pointer.strength = Math.min(pointer.strength + speed * 0.001, 0.5)

      const now = performance.now()
      const distanceFromLastRipple = Math.hypot(event.clientX - lastRippleX, event.clientY - lastRippleY)
      if (speed > 1.15 && distanceFromLastRipple > 18 && now - lastRippleTime > 62) {
        const strength = Math.min(0.34, 0.13 + speed * 0.0024)
        addRipple(event.clientX, event.clientY, strength, false)
        dropWater(event.clientX, event.clientY, 2.8, strength * 0.92)
        lastRippleX = event.clientX
        lastRippleY = event.clientY
        lastRippleTime = now
      }

      prevX = event.clientX
      prevY = event.clientY
    }

    const addRipple = (x: number, y: number, strength = 0.35, showDomRipple = true) => {
      ripples.push({ x, y, age: 0, life: 3.2, radius: 8, strength })
      window.__portfolioWaterDebug = { initialized: true, rippleCount: ripples.length }
      if (showDomRipple) {
        const rippleNode = document.createElement("span")
        rippleNode.className = "water-ripple"
        rippleNode.style.left = `${x}px`
        rippleNode.style.top = `${y}px`
        layerRef.current?.appendChild(rippleNode)
        window.setTimeout(() => rippleNode.remove(), 2200)
      }
      pointer.x = x / window.innerWidth
      pointer.y = y / window.innerHeight
      pointer.strength = Math.max(pointer.strength, strength)
      dropWater(x, y, 5.2, strength * 1.45)
      if (ripples.length > 34) ripples.shift()
    }

    window.__portfolioWaterTouch = (x: number, y: number, strength = 0.32, showDomRipple = false) => {
      const now = performance.now()
      const distance = Math.hypot(x - lastExternalRippleX, y - lastExternalRippleY)
      if (!showDomRipple && distance < 34 && now - lastExternalRippleTime < 110) return
      lastExternalRippleX = x
      lastExternalRippleY = y
      lastExternalRippleTime = now
      addRipple(x, y, strength, showDomRipple)
    }

    const onPointerDown = (event: PointerEvent) => {
      addRipple(event.clientX, event.clientY, 0.48)
    }

    const drawPastelBase = (width: number, height: number) => {
      const base = context.createLinearGradient(0, 0, width, height)
      base.addColorStop(0, "rgba(248, 252, 255, 0.1)")
      base.addColorStop(0.28, "rgba(223, 247, 251, 0.08)")
      base.addColorStop(0.52, "rgba(246, 232, 247, 0.08)")
      base.addColorStop(0.78, "rgba(215, 245, 242, 0.08)")
      base.addColorStop(1, "rgba(255, 248, 240, 0.12)")
      context.fillStyle = base
      context.fillRect(0, 0, width, height)

      const blooms = [
        [width * 0.2, height * 0.18, width * 0.52, "rgba(125, 225, 240, 0.16)"],
        [width * 0.74, height * 0.22, width * 0.46, "rgba(246, 176, 219, 0.14)"],
        [width * 0.42, height * 0.72, width * 0.62, "rgba(255, 244, 182, 0.12)"],
        [width * 0.86, height * 0.78, width * 0.44, "rgba(174, 213, 255, 0.14)"],
      ]

      blooms.forEach(([x, y, radius, color]) => {
        const glow = context.createRadialGradient(Number(x), Number(y), 0, Number(x), Number(y), Number(radius))
        glow.addColorStop(0, String(color))
        glow.addColorStop(1, "rgba(255, 255, 255, 0)")
        context.fillStyle = glow
        context.fillRect(0, 0, width, height)
      })
    }

    const getCoverSource = (canvasWidth: number, canvasHeight: number) => {
      const imageRatio = image.width / image.height
      const canvasRatio = canvasWidth / canvasHeight
      const sourceWidth = imageRatio > canvasRatio ? image.height * canvasRatio : image.width
      const sourceHeight = imageRatio > canvasRatio ? image.height : image.width / canvasRatio
      return {
        sourceWidth,
        sourceHeight,
        sourceX: (image.width - sourceWidth) / 2,
        sourceY: (image.height - sourceHeight) / 2,
      }
    }

    const drawCoverImage = (offset: number, y: number, height: number, alpha: number) => {
      const canvasWidth = window.innerWidth
      const canvasHeight = window.innerHeight
      const { sourceX, sourceY, sourceWidth, sourceHeight } = getCoverSource(canvasWidth, canvasHeight)
      const stripSourceY = sourceY + (y / canvasHeight) * sourceHeight
      const sourceStripHeight = (height / canvasHeight) * sourceHeight

      context.globalAlpha = alpha
      context.drawImage(
        image,
        sourceX,
        stripSourceY,
        sourceWidth,
        sourceStripHeight,
        offset,
        y,
        canvasWidth,
        height + 1,
      )
      context.globalAlpha = 1
    }

    const drawCrispBackground = (width: number, height: number) => {
      if (!image.complete || image.naturalWidth === 0) return
      const { sourceX, sourceY, sourceWidth, sourceHeight } = getCoverSource(width, height)
      context.globalAlpha = 1
      context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, width, height)
    }

    const drawRippleRefraction = (width: number, height: number) => {
      if (!image.complete || image.naturalWidth === 0) return
      const { sourceX, sourceY, sourceWidth, sourceHeight } = getCoverSource(width, height)
      const cellWidth = width / sim.width
      const cellHeight = height / sim.height
      const sampleStep = 1

      context.save()
      for (let gy = 1; gy < sim.height - 1; gy += sampleStep) {
        for (let gx = 1; gx < sim.width - 1; gx += sampleStep) {
          const index = gy * sim.width + gx
          const gradX = sim.current[index + 1] - sim.current[index - 1]
          const gradY = sim.current[index + sim.width] - sim.current[index - sim.width]
          const heightValue = sim.current[index]
          const energy = Math.min(1, Math.abs(gradX) + Math.abs(gradY) + Math.abs(heightValue) * 0.2)
          if (energy < 0.014) continue

          const dx = gradX * 58
          const dy = gradY * 58
          const destX = gx * cellWidth
          const destY = gy * cellHeight
          const destW = cellWidth * sampleStep + 2
          const destH = cellHeight * sampleStep + 2
          const sx = sourceX + ((destX - dx * 0.42) / width) * sourceWidth
          const sy = sourceY + ((destY - dy * 0.42) / height) * sourceHeight
          const sw = (destW / width) * sourceWidth
          const sh = (destH / height) * sourceHeight

          context.globalAlpha = Math.min(0.34, energy * 0.58)
          context.drawImage(image, sx, sy, sw, sh, destX + dx - 1, destY + dy - 1, destW, destH)
        }
      }
      context.restore()
      context.globalAlpha = 1
    }

    const drawWaterLighting = (width: number, height: number) => {
      const cellWidth = width / sim.width
      const cellHeight = height / sim.height
      const sampleStep = width > 900 ? 2 : 1

      context.save()
      for (let gy = 1; gy < sim.height - 1; gy += sampleStep) {
        for (let gx = 1; gx < sim.width - 1; gx += sampleStep) {
          const index = gy * sim.width + gx
          const gradX = sim.current[index + 1] - sim.current[index - 1]
          const gradY = sim.current[index + sim.width] - sim.current[index - sim.width]
          const crest = gradX * 0.72 + gradY * 0.48 + sim.current[index] * 0.04
          const energy = Math.min(1, Math.abs(gradX) + Math.abs(gradY) + Math.abs(sim.current[index]) * 0.18)
          if (energy < 0.018) continue

          const destX = gx * cellWidth
          const destY = gy * cellHeight
          const destW = cellWidth * sampleStep + 1
          const destH = cellHeight * sampleStep + 1

          if (crest > 0) {
            context.globalCompositeOperation = "screen"
            context.fillStyle = `rgba(255, 255, 248, ${Math.min(0.18, crest * 0.85)})`
          } else {
            context.globalCompositeOperation = "multiply"
            context.fillStyle = `rgba(87, 151, 176, ${Math.min(0.08, -crest * 0.32)})`
          }
          context.fillRect(destX, destY, destW, destH)

          const spec = Math.max(0, crest - 0.05) * energy
          if (spec > 0.002) {
            context.globalCompositeOperation = "screen"
            context.fillStyle = `rgba(255, 255, 255, ${Math.min(0.16, spec * 2.6)})`
            context.fillRect(destX, destY, destW, destH)
          }
        }
      }
      context.restore()
      context.globalAlpha = 1
      context.globalCompositeOperation = "source-over"
    }

    const drawRipples = (width: number, height: number) => {
      context.save()
      context.globalCompositeOperation = "screen"

      ripples.forEach((ripple) => {
        const progress = ripple.age / ripple.life
        const opacity = Math.max(0, 1 - progress)
        const radius = ripple.radius

        for (let i = 0; i < 2; i += 1) {
          context.beginPath()
          context.arc(ripple.x, ripple.y, radius + i * 26, 0, Math.PI * 2)
          context.strokeStyle = `rgba(255, 255, 255, ${0.16 * opacity * ripple.strength})`
          context.lineWidth = 1.2 - i * 0.25
          context.shadowColor = "rgba(156, 232, 244, 0.22)"
          context.shadowBlur = 8
          context.stroke()
        }

        const highlight = context.createRadialGradient(ripple.x, ripple.y, radius * 0.1, ripple.x, ripple.y, radius * 1.08)
        highlight.addColorStop(0, `rgba(255, 255, 255, ${0.025 * opacity * ripple.strength})`)
        highlight.addColorStop(0.68, `rgba(133, 228, 244, ${0.035 * opacity * ripple.strength})`)
        highlight.addColorStop(1, "rgba(255, 255, 255, 0)")
        context.fillStyle = highlight
        context.beginPath()
        context.arc(ripple.x, ripple.y, radius * 1.08, 0, Math.PI * 2)
        context.fill()
      })

      context.restore()

      for (let i = ripples.length - 1; i >= 0; i -= 1) {
        ripples[i].age += 0.016
        ripples[i].radius += Math.max(width, height) * 0.0027
        if (ripples[i].age >= ripples[i].life) ripples.splice(i, 1)
      }
    }

    const drawPetal = (petal: (typeof petals)[number]) => {
      const size = petal.size
      context.save()
      context.translate(petal.x, petal.y)
      context.rotate(petal.angle)
      context.scale(1, 0.56)

      const gradient = context.createRadialGradient(-size * 0.18, -size * 0.12, 0, 0, 0, size)
      gradient.addColorStop(0, `${petal.tint}${Math.min(petal.alpha + 0.18, 0.78)})`)
      gradient.addColorStop(0.72, `${petal.tint}${petal.alpha})`)
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)")

      context.fillStyle = gradient
      context.strokeStyle = "rgba(255, 255, 255, 0.36)"
      context.lineWidth = 0.8
      context.shadowColor = "rgba(255, 255, 255, 0.42)"
      context.shadowBlur = 8

      context.beginPath()
      context.moveTo(0, -size * 0.58)
      context.bezierCurveTo(size * 0.68, -size * 0.38, size * 0.72, size * 0.32, 0, size * 0.58)
      context.bezierCurveTo(-size * 0.72, size * 0.32, -size * 0.68, -size * 0.38, 0, -size * 0.58)
      context.fill()
      context.stroke()

      context.globalAlpha = petal.alpha * 0.45
      context.beginPath()
      context.moveTo(0, -size * 0.38)
      context.quadraticCurveTo(size * 0.1, 0, 0, size * 0.38)
      context.strokeStyle = "rgba(255, 255, 255, 0.62)"
      context.stroke()
      context.restore()
    }

    const drawPetals = (width: number, height: number) => {
      context.save()
      context.globalCompositeOperation = "source-over"

      petals.forEach((petal) => {
        petal.x += petal.vx + Math.sin(time * 0.9 + petal.phase) * 0.15
        petal.y += petal.vy + Math.cos(time * 1.1 + petal.phase) * 0.1
        petal.angle += petal.spin + Math.sin(time * 0.7 + petal.phase) * 0.0018

        ripples.forEach((ripple) => {
          const progress = ripple.age / ripple.life
          const dx = petal.x - ripple.x
          const dy = petal.y - ripple.y
          const distance = Math.hypot(dx, dy) || 1
          const ringInfluence = Math.exp(-((distance - ripple.radius) ** 2) / 3600) * (1 - progress) * ripple.strength
          petal.x += (dx / distance) * ringInfluence * 0.8
          petal.y += (dy / distance) * ringInfluence * 0.45
          petal.angle += ringInfluence * 0.01
        })

        const water = waterGradientAt(petal.x / width, petal.y / height)
        petal.x += water.dx * 1.3
        petal.y += water.dy * 1.1
        petal.angle += water.dx * 0.01

        const margin = petal.size * 2
        if (petal.x > width + margin) petal.x = -margin
        if (petal.x < -margin) petal.x = width + margin
        if (petal.y > height + margin) petal.y = -margin
        if (petal.y < -margin) petal.y = height + margin

        drawPetal(petal)
      })

      context.restore()
    }

    const drawSparkles = () => {
      context.save()
      context.globalCompositeOperation = "screen"
      sparkles.forEach((sparkle) => {
        const twinkle = (Math.sin(time * sparkle.speed + sparkle.phase) + 1) / 2
        const alpha = 0.04 + twinkle * 0.18
        const size = sparkle.size * (0.65 + twinkle * 0.55)

        context.strokeStyle = `rgba(255, 255, 255, ${alpha})`
        context.lineWidth = 0.8
        context.shadowColor = "rgba(255, 255, 255, 0.8)"
        context.shadowBlur = 4 + twinkle * 5

        context.beginPath()
        context.moveTo(sparkle.x - size * 2.4, sparkle.y)
        context.lineTo(sparkle.x + size * 2.4, sparkle.y)
        context.moveTo(sparkle.x, sparkle.y - size * 2.4)
        context.lineTo(sparkle.x, sparkle.y + size * 2.4)
        context.stroke()

        context.beginPath()
        context.arc(sparkle.x, sparkle.y, size * 0.62, 0, Math.PI * 2)
        context.fillStyle = `rgba(255, 255, 255, ${alpha * 0.45})`
        context.fill()
      })
      context.restore()
    }

    const rippleOffsetForStrip = (y: number) => {
      let shift = 0
      ripples.forEach((ripple) => {
        const progress = ripple.age / ripple.life
        const ring = ripple.radius
        const distance = Math.abs(y - ripple.y)
        const wave = Math.exp(-((distance - ring) ** 2) / 2400)
        const direction = y < ripple.y ? -1 : 1
          shift += direction * wave * (1 - progress) * ripple.strength * 9
      })
      return shift
    }

    const render = () => {
      if (!active) return
      time += 0.016
      window.__portfolioWaterDebug = { initialized: true, rippleCount: ripples.length }
      canvas.dataset.rippleCount = String(ripples.length)
      const width = window.innerWidth
      const height = window.innerHeight
      ambientDropTime -= 0.016
      if (ambientDropTime <= 0) {
        ambientDropTime = 0.75 + Math.random() * 1.7
        dropWater(Math.random() * width, Math.random() * height, 2.1, 0.075)
      }
      stepWater()

      context.clearRect(0, 0, width, height)
      drawCrispBackground(width, height)
      drawRippleRefraction(width, height)

      const sheen = context.createLinearGradient(0, 0, width, height)
      sheen.addColorStop(0, "rgba(255, 255, 255, 0.01)")
      sheen.addColorStop(0.3, "rgba(139, 231, 244, 0.012)")
      sheen.addColorStop(0.62, "rgba(247, 181, 224, 0.012)")
      sheen.addColorStop(1, "rgba(255, 255, 255, 0.014)")
      context.fillStyle = sheen
      context.fillRect(0, 0, width, height)

      drawSparkles()
      drawRipples(width, height)
      drawPetals(width, height)
      pointer.strength *= 0.94
      document.getElementById("ca-red")?.setAttribute("dx", String(-1.2 - pointer.strength * 4))
      document.getElementById("ca-blue")?.setAttribute("dx", String(1.2 + pointer.strength * 4))
      frame = requestAnimationFrame(render)
    }

    image.onload = render
    resize()
    if (image.complete) render()
    window.__portfolioWaterApp = { dispose: () => { active = false } }
    window.__portfolioWaterDebug = { initialized: true, rippleCount: ripples.length }
    window.addEventListener("mousemove", onPointerMove)
    window.addEventListener("pointermove", onPointerMove)
    document.addEventListener("mousemove", onPointerMove)
    document.addEventListener("pointermove", onPointerMove)
    canvas.addEventListener("mousemove", onPointerMove)
    canvas.addEventListener("pointermove", onPointerMove)
    window.addEventListener("pointerdown", onPointerDown)
    window.addEventListener("resize", resize)

    return () => {
      active = false
      window.__portfolioWaterApp?.dispose?.()
      window.__portfolioWaterApp = undefined
      window.__portfolioWaterTouch = undefined
      window.removeEventListener("mousemove", onPointerMove)
      window.removeEventListener("pointermove", onPointerMove)
      document.removeEventListener("mousemove", onPointerMove)
      document.removeEventListener("pointermove", onPointerMove)
      canvas.removeEventListener("mousemove", onPointerMove)
      canvas.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerdown", onPointerDown)
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className="water-stage" aria-hidden="true">
      <svg className="filter-defs">
        <defs>
          <filter id="chromatic-water" x="-4%" y="-4%" width="108%" height="108%">
            <feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="red" />
            <feOffset id="ca-red" dx="-1.4" dy="0" in="red" result="red-out" />
            <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="green" />
            <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="blue" />
            <feOffset id="ca-blue" dx="1.4" dy="0" in="blue" result="blue-out" />
            <feBlend in="red-out" in2="green" mode="screen" result="rg" />
            <feBlend in="rg" in2="blue-out" mode="screen" />
          </filter>
        </defs>
      </svg>
      <canvas ref={canvasRef} id="water-refraction-canvas" />
      <div ref={layerRef} className="ripple-layer" />
      <div className="water-vignette" />
    </div>
  )
}

function WaterRefraction() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const petalRefs = useRef<Array<HTMLSpanElement | null>>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const imagePath = "/pastel-reference-water-soft-highlights.jpg?v=1"
    let animationFrame = 0
    let lastFrameTime = performance.now()
    const ripples: Array<{ x: number; y: number; age: number; life: number; strength: number }> = []
    const petalState = floatingPetals.map((petal, index) => ({
      x: petal.x / 100,
      y: petal.y / 100,
      vx: 0,
      vy: 0,
      rotation: -18 + (index % 7) * 7,
      spin: (index % 2 === 0 ? 1 : -1) * (0.018 + index * 0.001),
      phase: index * 0.73,
    }))
    let lastTouchX = -1000
    let lastTouchY = -1000
    let lastTouchTime = 0
    window.__portfolioWaterTouch = (x: number, y: number, strength = 0.28) => {
      const target = canvasRef.current
      if (!target) return
      const now = performance.now()
      const distance = Math.hypot(x - lastTouchX, y - lastTouchY)
      if (strength < 0.36 && distance < 26 && now - lastTouchTime < 80) return
      lastTouchX = x
      lastTouchY = y
      lastTouchTime = now
      ripples.push({ x, y, age: 0, life: strength > 0.36 ? 1.8 : 1.25, strength })
      if (ripples.length > 18) ripples.shift()
      const event = new PointerEvent("pointermove", {
        bubbles: true,
        cancelable: true,
        clientX: x,
        clientY: y,
        pointerId: 1,
        pointerType: "mouse",
        pressure: Math.min(1, Math.max(0.12, strength)),
      })
      target.dispatchEvent(event)
      window.dispatchEvent(new MouseEvent("mousemove", { bubbles: true, clientX: x, clientY: y }))
    }

    const script = document.createElement("script")
    script.type = "module"
    script.textContent = `
      import LiquidBackground from 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.30/build/backgrounds/liquid1.min.js';
      const canvas = document.getElementById('liquid-refraction-canvas');
      if (canvas) {
        const app = LiquidBackground(canvas);
        app.loadImage('${imagePath}');
        app.liquidPlane.material.metalness = 0.0;
        app.liquidPlane.material.roughness = 1.0;
        app.liquidPlane.uniforms.displacementScale.value = 0.82;
        app.setRain(false);
        window.__portfolioLiquidApp = app;
      }
    `
    document.body.appendChild(script)

    const animatePetals = (now: number) => {
      const width = window.innerWidth || 1
      const height = window.innerHeight || 1
      const dt = Math.min(0.04, (now - lastFrameTime) / 1000 || 0.016)
      lastFrameTime = now

      petalState.forEach((petal, index) => {
        const px = petal.x * width
        const py = petal.y * height

        ripples.forEach((ripple) => {
          const progress = ripple.age / ripple.life
          const ringRadius = progress * Math.max(width, height) * 0.34
          const dx = px - ripple.x
          const dy = py - ripple.y
          const distance = Math.hypot(dx, dy) || 1
          const ringForce = Math.exp(-((distance - ringRadius) ** 2) / 7200)
          const push = ringForce * (1 - progress) * ripple.strength * 0.0065
          petal.vx += (dx / distance) * push
          petal.vy += (dy / distance) * push * 0.68
          petal.rotation += push * 210 * (index % 2 === 0 ? 1 : -1)
        })

        petal.vx += Math.sin(now * 0.00022 + petal.phase) * 0.000012
        petal.vy += Math.cos(now * 0.00018 + petal.phase * 1.7) * 0.00001

        const edgePadding = 0.045
        if (petal.x < edgePadding) petal.vx += (edgePadding - petal.x) * 0.0009
        if (petal.x > 1 - edgePadding) petal.vx -= (petal.x - (1 - edgePadding)) * 0.0009
        if (petal.y < edgePadding) petal.vy += (edgePadding - petal.y) * 0.0009
        if (petal.y > 1 - edgePadding) petal.vy -= (petal.y - (1 - edgePadding)) * 0.0009

        petal.vx *= 0.952
        petal.vy *= 0.952
        petal.x += petal.vx * dt * 60
        petal.y += petal.vy * dt * 60
        petal.rotation += petal.spin * dt * 60 + Math.sin(now * 0.001 + petal.phase) * 0.01

        const node = petalRefs.current[index]
        if (node) {
          const bob = Math.sin(now * 0.0011 + petal.phase) * 4
          node.style.left = `${petal.x * 100}%`
          node.style.top = `${petal.y * 100}%`
          node.style.transform = `translate3d(-50%, calc(-50% + ${bob}px), 0) rotate(${petal.rotation}deg) scale(${floatingPetals[index].size})`
        }
      })

      for (let i = ripples.length - 1; i >= 0; i -= 1) {
        ripples[i].age += dt
        if (ripples[i].age >= ripples[i].life) ripples.splice(i, 1)
      }

      animationFrame = requestAnimationFrame(animatePetals)
    }
    animationFrame = requestAnimationFrame(animatePetals)

    return () => {
      window.__portfolioWaterTouch = undefined
      if (window.__portfolioLiquidApp?.dispose) window.__portfolioLiquidApp.dispose()
      window.__portfolioLiquidApp = undefined
      script.parentNode?.removeChild(script)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <div className="water-stage water-stage--webgl" aria-hidden="true">
      <canvas ref={canvasRef} id="liquid-refraction-canvas" />
      <div className="floating-petal-layer">
        {Array.from({ length: 16 }, (_, index) => (
          <span
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            ref={(node) => {
              petalRefs.current[index] = node
            }}
            className={`floating-petal floating-petal--${floatingPetals[index].tint}`}
            style={{
              "--i": index,
              "--petal-rotate": `${-18 + (index % 7) * 7}deg`,
              "--petal-scale": floatingPetals[index].size,
            } as CSSProperties & Record<"--i" | "--petal-rotate" | "--petal-scale", number | string>}
          >
            <svg className="floating-petal-svg" viewBox="0 0 64 92" aria-hidden="true">
              <path
                className="floating-petal-shadow"
                d="M31 7 C14 21 9 48 17 68 C24 86 43 92 53 73 C62 54 55 24 31 7 Z"
              />
              <path
                className="floating-petal-shape"
                d="M30 6 C13 20 9 47 16 67 C23 86 43 91 53 73 C62 54 55 24 30 6 Z"
              />
              <path
                className="floating-petal-vein"
                d="M31 16 C34 32 38 50 45 75"
              />
            </svg>
          </span>
        ))}
      </div>
      <div className="water-vignette" />
    </div>
  )
}

export default function Home() {
  usePortfolioEffects()
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" })
  const [contactStatus, setContactStatus] = useState<ContactStatus>("idle")

  const handleWaterMove = (event: ReactPointerEvent<HTMLElement>) => {
    window.__portfolioWaterTouch?.(event.clientX, event.clientY, 0.22, false)
  }

  const handleWaterPress = (event: ReactPointerEvent<HTMLElement>) => {
    window.__portfolioWaterTouch?.(event.clientX, event.clientY, 0.42, true)
  }

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setContactStatus("loading")

    const sender = contactForm.name.trim() || "Portfolio visitor"
    const email = contactForm.email.trim()
    const message = contactForm.message.trim()
    const subject = encodeURIComponent(`Portfolio message from ${sender}`)
    const body = encodeURIComponent(
      [`Name: ${sender}`, `Email: ${email}`, "", message].join("\n"),
    )

    window.location.href = `mailto:zchen868@gatech.edu?subject=${subject}&body=${body}`
    setContactStatus("success")
    setContactForm({ name: "", email: "", message: "" })
  }

  return (
    <main onPointerMoveCapture={handleWaterMove} onPointerDownCapture={handleWaterPress}>
      <WaterRefraction />

      <nav className="nav-shell" aria-label="Primary navigation">
        <a className="brand" href="#top">ZC</a>
        <div className="nav-links">
          {navItems.map(([label, href]) => (
            <a key={label} href={href}>{label}</a>
          ))}
        </div>
      </nav>

      <section id="top" className="hero section-pad">
        <div className="hero-copy hero-enter">
          <div className="profile-orb" aria-hidden="true">
            <img src="/avatar-kuromi.jpg" alt="" />
          </div>
          <p className="eyebrow">AI Engineer · Software Developer · CS @ Georgia Tech</p>
          <h1>Zhenyu (Bella) Chen</h1>
          <p className="hero-text">
            I build AI evaluation systems, full-stack applications, and machine learning projects that connect research ideas with usable products.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#resume">View Resume</a>
            <a className="button secondary" href="#projects">Projects ↓</a>
            <a className="button ghost" href="#contact">Contact ↓</a>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      <section id="about" className="section-pad split-section">
        <div data-reveal>
          <h2>About Me</h2>
          <div className="profile-links">
            <a href="https://github.com/zchen868">GitHub →</a>
            <a href="https://www.linkedin.com/in/zhenyu-chen-53955823b/">LinkedIn →</a>
          </div>
        </div>
        <div className="body-copy" data-reveal>
          <p>
            I hold an M.S. in Computer Science with a Machine Learning specialization from Georgia Tech, along with a B.S. in Computer Science. My work spans agent evaluation platforms, enterprise AI assistants, AWS backend systems, frontend dashboards, and applied machine learning projects.
          </p>
          <div className="info-list">
            <div data-reveal><span>Current Focus</span><strong>Agentic AI evaluation, RAG systems, and applied machine learning</strong></div>
            <div data-reveal><span>Education</span><strong>Georgia Tech · M.S. CS, Machine Learning</strong></div>
            <div data-reveal><span>Location</span><strong>Atlanta, GA</strong></div>
            <div data-reveal><span>Highlight</span><strong>500+ benchmark samples · 90% manual effort reduced</strong></div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      <section id="skills" className="section-pad">
        <h2 data-reveal>Technical toolkit</h2>
        <div className="skill-grid">
          {Object.entries(skills).map(([group, items]) => (
            <section className="skill-card" key={group} data-reveal>
              <h3>{group}</h3>
              <div className="tag-list">
                {items.map((item) => <span key={item}>{item}</span>)}
              </div>
            </section>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      <section id="projects" className="section-pad">
        <div className="section-heading-row" data-reveal>
          <div>
            <h2>Projects</h2>
          </div>
          <a className="text-link" href="https://github.com/zchen868">All repositories</a>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.name} data-reveal>
              <div>
                <h3>{project.name}</h3>
                <p>{project.summary}</p>
              </div>
              <div className="tag-list compact">
                {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
              <a className="project-link" href={project.repo}>View on GitHub</a>
            </article>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      <section id="education" className="section-pad education-section">
        <h2 data-reveal>Education</h2>
        <div className="timeline">
          {education.map((item) => (
            <article className="timeline-item education-item" key={`${item.school}-${item.degree}`} data-reveal>
              <div className="timeline-meta">
                <span>{item.date}</span>
                <span>{item.location}</span>
              </div>
              <h3>{item.degree}</h3>
              {"focus" in item && item.focus ? <p className="education-focus">{item.focus}</p> : null}
              <p className="company">{item.school}</p>
              <ul>
                {item.details.map((detail) => <li key={detail}>{detail}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      <section id="experience" className="section-pad experience-section">
        <h2 data-reveal>Experience</h2>
        <div className="timeline">
          {experience.map((item) => (
            <article className="timeline-item" key={`${item.company}-${item.role}`} data-reveal>
              <div className="timeline-meta">
                <span>{item.date}</span>
                <span>{item.location}</span>
              </div>
              <h3>{item.role}</h3>
              <p className="company">{item.company}</p>
              <ul>
                {item.points.map((point) => <li key={point}>{point}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      <section id="resume" className="section-pad resume-band" data-reveal>
        <div>
          <h2>Resume</h2>
          <p>Download the full PDF for a concise version of my education, experience, and project work.</p>
        </div>
        <a className="button primary" href="/Zhenyu_Chen_resume.pdf">Download PDF</a>
      </section>

      <div className="section-divider" />

      <section id="contact" className="section-pad contact-section">
        <div className="contact-copy" data-reveal>
          <p className="section-kicker">Contact</p>
          <h2>Get in Touch</h2>
          <p className="contact-intro">
            Have a question, collaboration idea, or role that fits my work? Send a note and I will get back to you soon.
          </p>
          <div className="contact-links">
            <a href="mailto:zchen868@gatech.edu">Email</a>
            <a href="https://www.linkedin.com/in/zhenyu-chen-53955823b/">LinkedIn</a>
            <a href="https://github.com/zchen868">GitHub</a>
          </div>
        </div>

        {contactStatus === "success" ? (
          <div className="contact-success" data-reveal>
            <p className="contact-success-title">Message draft opened successfully.</p>
            <p className="contact-note">I will get back to you soon after your email is sent.</p>
            <button className="contact-reset" type="button" onClick={() => setContactStatus("idle")}>
              Send another message
            </button>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleContactSubmit} data-reveal>
            <label htmlFor="contact-name">
              <span>Name <em>(optional)</em></span>
              <input
                id="contact-name"
                name="name"
                type="text"
                placeholder="Your name"
                value={contactForm.name}
                onChange={(event) => setContactForm({ ...contactForm, name: event.target.value })}
              />
            </label>
            <label htmlFor="contact-email">
              <span>Email <strong>*</strong></span>
              <input
                id="contact-email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                value={contactForm.email}
                onBlur={(event) => setContactForm({ ...contactForm, email: event.target.value.trim() })}
                onChange={(event) => setContactForm({ ...contactForm, email: event.target.value })}
              />
            </label>
            <label htmlFor="contact-message">
              <span>Message <strong>*</strong></span>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                placeholder="What's on your mind?"
                required
                value={contactForm.message}
                onChange={(event) => setContactForm({ ...contactForm, message: event.target.value })}
              />
            </label>
            <button className="button primary contact-submit" type="submit" disabled={contactStatus === "loading"}>
              {contactStatus === "loading" ? "Opening..." : "Send Message"}
            </button>
            <p className="contact-note">This opens your email app with the message details.</p>
          </form>
        )}
      </section>
    </main>
  )
}

declare global {
  interface Window {
    __portfolioWaterApp?: { dispose?: () => void }
    __portfolioLiquidApp?: { dispose?: () => void }
    __portfolioWaterDebug?: { initialized: boolean; rippleCount: number }
    __portfolioWaterTouch?: (x: number, y: number, strength?: number, showDomRipple?: boolean) => void
  }
}
