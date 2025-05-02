import { Engine, Scene } from 'excalibur'
import { Star } from './star'

export class MyLevel extends Scene {
  private starCount: number = 0

  override update(engine: Engine, _elapsed: number): void {
    super.update(engine, _elapsed)

    this.camera.pos.setTo(engine.halfDrawWidth, engine.halfDrawHeight)
    if (this.starCount < 1000) {
      for (let i = 0; i < 100; i++) {
        const star = new Star()
        this.add(star) // Actors need to be added to a scene to be drawn
        this.starCount++
      }
    }
  }
}
