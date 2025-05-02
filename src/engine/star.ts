import { Actor, Circle, Color, Engine, Vector } from 'excalibur'

export class Star extends Actor {
  constructor() {
    super()
  }

  private scaleOffset: number = 0
  private scaleDuration: number = 0

  private posX: number = Math.random()
  private posY: number = Math.random()

  override onInitialize() {
    const size = Math.random() * 0.5 + 0.5
    this.graphics.use(
      new Circle({
        radius: size,
        color: Color.White,
        opacity: Math.random() * 0.25 + 0.75
      })
    )

    this.scaleOffset = Math.random() * 0.2 + 0.4
    this.scaleDuration = Math.random() * 1000 + 1000

    this.actions.delay(Math.random() * 1500)
    this.actions.repeatForever((ctx) => {
      ctx.scaleBy({
        duration: this.scaleDuration,
        scaleOffset: new Vector(this.scaleOffset, this.scaleOffset)
      })
      ctx.scaleBy({
        duration: this.scaleDuration,
        scaleOffset: new Vector(-this.scaleOffset, -this.scaleOffset)
      })
    })
  }

  override update(engine: Engine, elapsed: number): void {
    super.update(engine, elapsed)
    this.pos.setTo(this.posX * engine.drawWidth, this.posY * engine.drawHeight)
  }
}
