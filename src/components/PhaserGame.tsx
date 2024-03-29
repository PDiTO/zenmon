import React, { useEffect, useRef } from "react";
import Phaser from "phaser";
import { Monster } from "@/types/monster";

interface PhaserGameProps {
  monster: Monster; // Assuming monType is a string for this example
}

const PhaserGame: React.FC<PhaserGameProps> = ({ monster }) => {
  const gameRef = useRef<HTMLDivElement>(null);
  const phaserGame = useRef<Phaser.Game | null>(null); // Ref to store the Phaser game instance

  const monType = monster.base;

  useEffect(() => {
    let isActive = true;
    // Only create a new game if one doesn't already exist
    if (
      gameRef.current &&
      typeof window !== "undefined" &&
      !phaserGame.current
    ) {
      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        width: 200,
        height: 200,
        transparent: true,
        pixelArt: true,
        roundPixels: true,
        fps: {
          target: 60,
          forceSetTimeOut: true,
        },
        parent: gameRef.current,
        scene: {
          preload() {
            this.load.spritesheet(
              "mon-attack",
              `spritesheets/mon0${monType}/mon0${monType}_attack_strip7.png`,
              {
                frameWidth: 40,
                frameHeight: 40,
              }
            );

            this.load.spritesheet(
              "mon-crouch",
              `spritesheets/mon0${monType}/mon0${monType}_crouch_strip8.png`,
              {
                frameWidth: 40,
                frameHeight: 40,
              }
            );

            this.load.spritesheet(
              "mon-dash",
              `spritesheets/mon0${monType}/mon0${monType}_dash_strip9.png`,
              {
                frameWidth: 40,
                frameHeight: 40,
              }
            );

            this.load.spritesheet(
              "mon-die",
              `spritesheets/mon0${monType}/mon0${monType}_die_strip8.png`,
              {
                frameWidth: 40,
                frameHeight: 40,
              }
            );

            this.load.spritesheet(
              "mon-fall",
              `spritesheets/mon0${monType}/mon0${monType}_fall_strip3.png`,
              {
                frameWidth: 40,
                frameHeight: 40,
              }
            );

            this.load.spritesheet(
              "mon-fright",
              `spritesheets/mon0${monType}/mon0${monType}_fright_strip8.png`,
              {
                frameWidth: 40,
                frameHeight: 40,
              }
            );

            this.load.spritesheet(
              "mon-hurt",
              `spritesheets/mon0${monType}/mon0${monType}_hurt_strip4.png`,
              {
                frameWidth: 40,
                frameHeight: 40,
              }
            );

            this.load.spritesheet(
              "mon-idle-blink",
              `spritesheets/mon0${monType}/mon0${monType}_idle_blink_strip8.png`,
              {
                frameWidth: 40,
                frameHeight: 40,
              }
            );

            this.load.spritesheet(
              "mon-idle",
              `spritesheets/mon0${monType}/mon0${monType}_idle_strip8.png`,
              {
                frameWidth: 40,
                frameHeight: 40,
              }
            );

            this.load.spritesheet(
              "mon-jump",
              `spritesheets/mon0${monType}/mon0${monType}_jump_strip4.png`,
              {
                frameWidth: 40,
                frameHeight: 40,
              }
            );

            this.load.spritesheet(
              "mon-land",
              `spritesheets/mon0${monType}/mon0${monType}_land_strip2.png`,
              {
                frameWidth: 40,
                frameHeight: 40,
              }
            );

            this.load.spritesheet(
              "mon-ledge-climb",
              `spritesheets/mon0${monType}/mon0${monType}_ledgeclimb_strip11.png`,
              {
                frameWidth: 40,
                frameHeight: 40,
              }
            );

            this.load.spritesheet(
              "mon-ledge-climb-struggle",
              `spritesheets/mon0${monType}/mon0${monType}_ledgeclimb_struggle_strip12.png`,
              {
                frameWidth: 40,
                frameHeight: 40,
              }
            );

            this.load.spritesheet(
              "mon-ledge-grab",
              `spritesheets/mon0${monType}/mon0${monType}_ledgegrab_strip5.png`,
              {
                frameWidth: 40,
                frameHeight: 40,
              }
            );

            this.load.spritesheet(
              "mon-ledge-idle",
              `spritesheets/mon0${monType}/mon0${monType}_ledgeidle_strip8.png`,
              {
                frameWidth: 40,
                frameHeight: 40,
              }
            );

            this.load.spritesheet(
              "mon-liedown",
              `spritesheets/mon0${monType}/mon0${monType}_liedown_strip24.png`,
              {
                frameWidth: 40,
                frameHeight: 40,
              }
            );

            this.load.spritesheet(
              "mon-run",
              `spritesheets/mon0${monType}/mon0${monType}_run_strip4.png`,
              {
                frameWidth: 40,
                frameHeight: 40,
              }
            );

            this.load.spritesheet(
              "mon-sit",
              `spritesheets/mon0${monType}/mon0${monType}_sit_strip8.png`,
              {
                frameWidth: 40,
                frameHeight: 40,
              }
            );

            this.load.spritesheet(
              "mon-sneak",
              `spritesheets/mon0${monType}/mon0${monType}_sneak_strip8.png`,
              {
                frameWidth: 40,
                frameHeight: 40,
              }
            );

            this.load.spritesheet(
              "mon-walk",
              `spritesheets/mon0${monType}/mon0${monType}_walk_strip8.png`,
              {
                frameWidth: 40,
                frameHeight: 40,
              }
            );

            this.load.spritesheet(
              "mon-wall-climb",
              `spritesheets/mon0${monType}/mon0${monType}_wallclimb_strip8.png`,
              {
                frameWidth: 40,
                frameHeight: 40,
              }
            );

            this.load.spritesheet(
              "mon-wall-grab",
              `spritesheets/mon0${monType}/mon0${monType}_wallgrab_strip8.png`,
              {
                frameWidth: 40,
                frameHeight: 40,
              }
            );
          },
          create() {
            this.anims.create({
              key: "attack",
              frames: this.anims.generateFrameNumbers("mon-attack", {
                start: 0,
                end: 6,
              }),
              frameRate: 5,
              repeat: -1,
            });

            this.anims.create({
              key: "crouch",
              frames: this.anims.generateFrameNumbers("mon-crouch", {
                start: 0,
                end: 7,
              }),
              frameRate: 5,
              repeat: -1,
            });

            this.anims.create({
              key: "dash",
              frames: this.anims.generateFrameNumbers("mon-dash", {
                start: 0,
                end: 8,
              }),
              frameRate: 5,
              repeat: -1,
            });

            this.anims.create({
              key: "die",
              frames: this.anims.generateFrameNumbers("mon-die", {
                start: 0,
                end: 7,
              }),
              frameRate: 5,
              repeat: 0,
            });

            this.anims.create({
              key: "fall",
              frames: this.anims.generateFrameNumbers("mon-fall", {
                start: 0,
                end: 2,
              }),
              frameRate: 5,
              repeat: 0,
            });

            this.anims.create({
              key: "fright",
              frames: this.anims.generateFrameNumbers("mon-fright", {
                start: 0,
                end: 7,
              }),
              frameRate: 5,
              repeat: -1,
            });

            this.anims.create({
              key: "hurt",
              frames: this.anims.generateFrameNumbers("mon-hurt", {
                start: 0,
                end: 3,
              }),
              frameRate: 5,
              repeat: -1,
            });

            this.anims.create({
              key: "idle-blink",
              frames: this.anims.generateFrameNumbers("mon-idle-blink", {
                start: 0,
                end: 7,
              }),
              frameRate: 5,
              repeat: -1,
            });

            this.anims.create({
              key: "idle",
              frames: this.anims.generateFrameNumbers("mon-idle", {
                start: 0,
                end: 7,
              }),
              frameRate: 5,
              repeat: -1,
            });

            this.anims.create({
              key: "jump",
              frames: this.anims.generateFrameNumbers("mon-jump", {
                start: 0,
                end: 3,
              }),
              frameRate: 5,
              repeat: 0,
            });

            this.anims.create({
              key: "land",
              frames: this.anims.generateFrameNumbers("mon-land", {
                start: 0,
                end: 1,
              }),
              frameRate: 5,
              repeat: 0,
            });

            this.anims.create({
              key: "ledge-climb",
              frames: this.anims.generateFrameNumbers("mon-ledge-climb", {
                start: 0,
                end: 10,
              }),
              frameRate: 5,
              repeat: -1,
            });

            this.anims.create({
              key: "ledge-climb-struggle",
              frames: this.anims.generateFrameNumbers(
                "mon-ledge-climb-struggle",
                {
                  start: 0,
                  end: 11,
                }
              ),
              frameRate: 5,
              repeat: -1,
            });

            this.anims.create({
              key: "ledge-grab",
              frames: this.anims.generateFrameNumbers("mon-ledge-grab", {
                start: 0,
                end: 4,
              }),
              frameRate: 5,
              repeat: -1,
            });

            this.anims.create({
              key: "ledge-idle",
              frames: this.anims.generateFrameNumbers("mon-ledge-idle", {
                start: 0,
                end: 7,
              }),
              frameRate: 5,
              repeat: -1,
            });

            this.anims.create({
              key: "liedown",
              frames: this.anims.generateFrameNumbers("mon-liedown", {
                start: 0,
                end: 23,
              }),
              frameRate: 5,
              repeat: -1,
            });

            this.anims.create({
              key: "run",
              frames: this.anims.generateFrameNumbers("mon-run", {
                start: 0,
                end: 3,
              }),
              frameRate: 5,
              repeat: -1,
            });

            this.anims.create({
              key: "sit",
              frames: this.anims.generateFrameNumbers("mon-sit", {
                start: 0,
                end: 7,
              }),
              frameRate: 5,
              repeat: -1,
            });

            this.anims.create({
              key: "sneak",
              frames: this.anims.generateFrameNumbers("mon-sneak", {
                start: 0,
                end: 7,
              }),
              frameRate: 5,
              repeat: -1,
            });

            this.anims.create({
              key: "walk",
              frames: this.anims.generateFrameNumbers("mon-walk", {
                start: 0,
                end: 7,
              }),
              frameRate: 5,
              repeat: -1,
            });

            this.anims.create({
              key: "wall-climb",
              frames: this.anims.generateFrameNumbers("mon-wall-climb", {
                start: 0,
                end: 7,
              }),
              frameRate: 5,
              repeat: -1,
            });

            this.anims.create({
              key: "wall-grab",
              frames: this.anims.generateFrameNumbers("mon-wall-grab", {
                start: 0,
                end: 7,
              }),
              frameRate: 5,
              repeat: -1,
            });

            let mon_energy = monster.energy;

            const mon = this.add
              .sprite(
                this.cameras.main.width / 2,
                this.cameras.main.height / 2,
                "idle"
              )
              .setScale(6);

            if (mon_energy < 20) {
              mon.play("fright");
            } else if (mon_energy < 40) {
              mon.play("liedown");
            } else if (mon_energy < 60) {
              mon.play("idle");
            } else if (mon_energy < 80) {
              mon.play("walk");
            } else if (mon_energy < 100) {
              mon.play("run");
            } else if (mon_energy === 100) {
              mon.play("dash");
            }

            // Enable input on the sprite
            mon.setInteractive();

            // Add a listener for the 'pointerdown' event (tap or click)
            mon.on("pointerdown", () => {
              mon.play("jump");

              // When the 'react' animation completes, return to the 'idle' animation
              mon.on(
                Phaser.Animations.Events.ANIMATION_COMPLETE,
                () => {
                  if (mon_energy < 20) {
                    mon.play("fright");
                  } else if (mon_energy < 40) {
                    mon.play("liedown");
                  } else if (mon_energy < 60) {
                    mon.play("idle");
                  } else if (mon_energy < 80) {
                    mon.play("walk");
                  } else if (mon_energy < 100) {
                    mon.play("run");
                  } else if (mon_energy === 100) {
                    mon.play("dash");
                  }
                },
                this
              ); // Passing 'this' to ensure the callback's context is correct
            });

            document.addEventListener("phaserEvent", (event) => {
              if (!isActive) return;
              // Do something with the event
              const customEvent = event as CustomEvent;
              const energy = customEvent.detail.energy;
              mon_energy = energy;

              if (!mon) {
                return;
              }

              if (energy < 20) {
                mon.play("fright");
              } else if (energy < 40) {
                mon.play("liedown");
              } else if (energy < 60) {
                mon.play("idle");
              } else if (energy < 80) {
                mon.play("walk");
              } else if (energy < 100) {
                mon.play("run");
              } else if (energy === 100) {
                mon.play("dash");
              }
            });
          },
        },
      };

      // Store the game instance in the ref
      phaserGame.current = new Phaser.Game(config);
    }

    // Cleanup function to destroy the game instance when the component unmounts
    return () => {
      isActive = false;
      if (phaserGame.current) {
        phaserGame.current.destroy(true);
        phaserGame.current = null;
      }
    };
  }, []);

  return <div ref={gameRef} />;
};

export default PhaserGame;
