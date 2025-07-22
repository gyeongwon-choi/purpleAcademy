const rootDir = import.meta.env.VITE_DIRECTORY;
const activityDir = `${rootDir}/images/week/week1/activity`; // 액티비티 전용 이미지 경로
const effectSoundsDir = `${rootDir}/sounds/week/week1/effects`; // 효과음 사운드 경로
const quizImagesDir = `${rootDir}/images/week/week1`; // 퀴즈 이미지 경로
const quizSoundsDir = `${rootDir}/sounds/week/week1/quizs`; // 퀴즈 음성 경로

const question = {
  s1: {
    english : "Listen to the sound, and choose a word picture that begins with the same consonant.",
    korean : "소리를 듣고, 같은 자음으로  시작하는 단어 그림을 고르세요.",
  },
  s2: {
    english : "Choose AlphaB that corresponds to the first sound sound.",
    korean : "첫 자음 소리에 해당하는 알파벳을 고르세요.",
  },
  s3: {
    english : "Check the sounds, letters, and meanings of the words.",
    korean : "단어의 소리와 글자, 의미를 확인하세요.",
  },
  s4: {
    english : "Press the record button. Say the word.",
    korean : "녹음 버튼을 눌러, 단어를 말해보아요.",
  },
}

const data = {
  activityType: "hearMatch",
  thumbnail: {
    title: "단모음 a, i",
    week: "W1",
    backgroundSrc: `${activityDir}/thumbnail_bg.png`,
    boardSrc: `${activityDir}/thumbnail_board.png`,
    charSrc: `${activityDir}/thumbnail_char.png`,
    startBtnSrc: `${activityDir}/thumbnail_startBtn.png`,
    weekTextColor: `#b247de`,
  },
  effectSounds: [
    { name: "intro", src: `${effectSoundsDir}/intro/0_intro_walking_only.wav` },
    { name: "outro", src: `${effectSoundsDir}/outro/0_outro_yay_only.wav` },
    { name: "correct", src: `${effectSoundsDir}/correct/6_correct.wav` },
    { name: "wrong", src: `${effectSoundsDir}/wrong/5_wrong.wav` },
    { name: "stamp", src: `${effectSoundsDir}/stamp/7_stamp.wav` },
    { name: "paper", src: `${effectSoundsDir}/paper/1_paper_unfold.wav` },
  ],
  quiz: {
    currentQuizObj: {
      imgSrc: {
        defaultSrc: `${activityDir}/quiz_progress.png`,
        recordingSrc: `${activityDir}/quiz_progress_recording.png`
      }
    },
    order: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6"],
    quizs: {
      Q1: {
        quizId: "Q1",
        bg: `${activityDir}/quiz_bg.png`,
        word: "cap",
        images: [
          { name: "cap", src: `${quizImagesDir}/q1/cap.png` },
          { name: "pencil", src: `${quizImagesDir}/q1/pencil.png` },
          { name: "zipper", src: `${quizImagesDir}/q1/zipper.png` }
        ],
        screenOrder: ["S1", "S2", "S3", "S4"],
        screenMap: {
          S1: {
            question: {
              english: `${question.s1.english}`,
              korean: `${question.s1.korean}`
            },
            sounds: [
              { name: "cap", src: `${quizSoundsDir}/q1/s1/cap.mp3` },
              { name: "pencil_fake", src: `${quizSoundsDir}/q1/s1/pencil_fake.mp3` },
              { name: "zipper", src: `${quizSoundsDir}/q1/s1/zipper.mp3` }
            ],
            correct: "cap",
            soundExample: { name: "c", src: `${quizSoundsDir}/q1/s1/c.mp3` },
          },
          S2: {
            question: {
              english: `${question.s2.english}`,
              korean: `${question.s2.korean}`
            },
            sounds: [
              { name: "c", src: `${quizSoundsDir}/q1/s2/c.mp3` },
              { name: "p", src: `${quizSoundsDir}/q1/s2/p.mp3` },
              { name: "z", src: `${quizSoundsDir}/q1/s2/z.mp3` }
            ],
            correct: "c",
            soundCorrect: { name: "cap", src: `${quizSoundsDir}/q1/s2/cap.mp3` },
          },
          S3: {
            question: {
              english: `${question.s3.english}`,
              korean: `${question.s3.korean}`
            },
            sounds: [
              { name: "cap_1", src: `${quizSoundsDir}/q1/s3/cap_1.mp3` },
              { name: "cap_2", src: `${quizSoundsDir}/q1/s3/cap_2.mp3` },
              { name: "cap_3", src: `${quizSoundsDir}/q1/s3/cap_3.mp3` },
              { name: "cap_all", src: `${quizSoundsDir}/q1/s3/cap_all.mp3` }
            ],
            soundPosition: "first",
          },
          S4: {
            question: {
              english: `${question.s4.english}`,
              korean: `${question.s4.korean}`
            },
            sounds: [
              { name: "cap_1", src: `${quizSoundsDir}/q1/s4/cap_1.mp3` },
              { name: "cap_2", src: `${quizSoundsDir}/q1/s4/cap_2.mp3` },
              { name: "cap_3", src: `${quizSoundsDir}/q1/s4/cap_3.mp3` },
              { name: "cap_all", src: `${quizSoundsDir}/q1/s4/cap_all.mp3` }
            ]
          }
        }
      },
      Q2: {
        quizId: "Q2",
        bg: `${activityDir}/quiz_bg.png`,
        word: "yarn",
        images: [
          { name: "fish", src: `${quizImagesDir}/q2/fish.png` },
          { name: "queen", src: `${quizImagesDir}/q2/queen.png` },
          { name: "yarn_수정전", src: `${quizImagesDir}/q2/yarn_수정전.png` }
        ],
        screenOrder: ["S1", "S2", "S3", "S4"],
        screenMap: {
          S1: {
            question: {
              english: `${question.s1.english}`,
              korean: `${question.s1.korean}`
            },
            sounds: [
              { name: "fish", src: `${quizSoundsDir}/q2/s1/fish.mp3` },
              { name: "queen", src: `${quizSoundsDir}/q2/s1/queen.mp3` },
              { name: "yarn", src: `${quizSoundsDir}/q2/s1/yarn.mp3` }
            ],
            correct: "yarn",
            soundExample: { name: "y", src: `${quizSoundsDir}/q2/s1/y.mp3` },
          },
          S2: {
            question: {
              english: `${question.s2.english}`,
              korean: `${question.s2.korean}`
            },
            sounds: [
              { name: "f", src: `${quizSoundsDir}/q2/s2/f.mp3` },
              { name: "q", src: `${quizSoundsDir}/q2/s2/q.mp3` },
              { name: "y", src: `${quizSoundsDir}/q2/s2/y.mp3` }
            ],
            correct: "y",
            soundCorrect: { name: "yarn", src: `${quizSoundsDir}/q2/s2/yarn.mp3` },
          },
          S3: {
            question: {
              english: `${question.s3.english}`,
              korean: `${question.s3.korean}`
            },
            sounds: [
              { name: "yarn_1", src: `${quizSoundsDir}/q2/s3/yarn_1.mp3` },
              { name: "yarn_2", src: `${quizSoundsDir}/q2/s3/yarn_2.mp3` },
              { name: "yarn_3", src: `${quizSoundsDir}/q2/s3/yarn_3.mp3` },
              { name: "yarn_all", src: `${quizSoundsDir}/q2/s3/yarn_all.mp3` }
            ],
            soundPosition: "first",
          },
          S4: {
            question: {
              english: `${question.s4.english}`,
              korean: `${question.s4.korean}`
            },
            sounds: [
              { name: "yarn_1", src: `${quizSoundsDir}/q2/s4/yarn_1.mp3` },
              { name: "yarn_2", src: `${quizSoundsDir}/q2/s4/yarn_2.mp3` },
              { name: "yarn_3", src: `${quizSoundsDir}/q2/s4/yarn_3.mp3` },
              { name: "yarn_all", src: `${quizSoundsDir}/q2/s4/yarn_all.mp3` }
            ]
          }
        }
      },
      Q3: {
        quizId: "Q3",
        bg: `${activityDir}/quiz_bg.png`,
        word: "ham",
        images: [
          { name: "bus", src: `${quizImagesDir}/q3/bus.png` },
          { name: "ham", src: `${quizImagesDir}/q3/ham.png` },
          { name: "pig", src: `${quizImagesDir}/q3/pig.png` }
        ],
        screenOrder: ["S1", "S2", "S3", "S4"],
        screenMap: {
          S1: {
            question: {
              english: `${question.s1.english}`,
              korean: `${question.s1.korean}`
            },
            sounds: [
              { name: "bus", src: `${quizSoundsDir}/q3/s1/bus.mp3` },
              { name: "ham", src: `${quizSoundsDir}/q3/s1/ham.mp3` },
              { name: "pig", src: `${quizSoundsDir}/q3/s1/pig.mp3` }
            ],
            correct: "ham",
            soundExample: { name: "m", src: `${quizSoundsDir}/q3/s1/m.mp3` },
          },
          S2: {
            question: {
              english: `${question.s2.english}`,
              korean: `${question.s2.korean}`
            },
            sounds: [
              { name: "g", src: `${quizSoundsDir}/q3/s2/g.mp3` },
              { name: "m", src: `${quizSoundsDir}/q3/s2/m.mp3` },
              { name: "s", src: `${quizSoundsDir}/q3/s2/s.mp3` }
            ],
            correct: "m",
            soundCorrect: { name: "ham", src: `${quizSoundsDir}/q3/s2/ham.mp3` },
          },
          S3: {
            question: {
              english: `${question.s3.english}`,
              korean: `${question.s3.korean}`
            },
            sounds: [
              { name: "ham_1", src: `${quizSoundsDir}/q3/s3/ham_1.mp3` },
              { name: "ham_2", src: `${quizSoundsDir}/q3/s3/ham_2.mp3` },
              { name: "ham_3", src: `${quizSoundsDir}/q3/s3/ham_3.mp3` },
              { name: "ham_all", src: `${quizSoundsDir}/q3/s3/ham_all.mp3` }
            ],
            soundPosition: "last",
          },
          S4: {
            question: {
              english: `${question.s4.english}`,
              korean: `${question.s4.korean}`
            },
            sounds: [
              { name: "ham_1", src: `${quizSoundsDir}/q3/s4/ham_1.mp3` },
              { name: "ham_2", src: `${quizSoundsDir}/q3/s4/ham_2.mp3` },
              { name: "ham_3", src: `${quizSoundsDir}/q3/s4/ham_3.mp3` },
              { name: "ham_all", src: `${quizSoundsDir}/q3/s4/ham_all.mp3` }
            ]
          }
        }
      },
      Q4: {
        quizId: "Q4",
        bg: `${activityDir}/quiz_bg.png`,
        word: "hook",
        images: [
          { name: "hook", src: `${quizImagesDir}/q4/hook.png` },
          { name: "pet_수정전", src: `${quizImagesDir}/q4/pet_수정전.png` },
          { name: "roof_수정전", src: `${quizImagesDir}/q4/roof_수정전.png` }
        ],
        screenOrder: ["S1", "S2", "S3", "S4"],
        screenMap: {
          S1: {
            question: {
              english: `${question.s1.english}`,
              korean: `${question.s1.korean}`
            },
            sounds: [
              { name: "hook_all", src: `${quizSoundsDir}/q4/s1/hook_all.mp3` },
              { name: "pet_all", src: `${quizSoundsDir}/q4/s1/pet_all.mp3` },
              { name: "roof_all", src: `${quizSoundsDir}/q4/s1/roof_all.mp3` }
            ],
            correct: "hook_all",
            soundExample: { name: "k", src: `${quizSoundsDir}/q4/s1/k.mp3` },
          },
          S2: {
            question: {
              english: `${question.s2.english}`,
              korean: `${question.s2.korean}`
            },
            sounds: [
              { name: "f", src: `${quizSoundsDir}/q4/s2/f.mp3` },
              { name: "k", src: `${quizSoundsDir}/q4/s2/k.mp3` },
              { name: "t", src: `${quizSoundsDir}/q4/s2/t.mp3` }
            ],
            correct: "c",
            soundCorrect: { name: "hook", src: `${quizSoundsDir}/q4/s2/hook.mp3` },
          },
          S3: {
            question: {
              english: `${question.s3.english}`,
              korean: `${question.s3.korean}`
            },
            sounds: [
              { name: "hook_1", src: `${quizSoundsDir}/q4/s3/hook_1.mp3` },
              { name: "hook_2", src: `${quizSoundsDir}/q4/s3/hook_2.mp3` },
              { name: "hook_3", src: `${quizSoundsDir}/q4/s3/hook_3.mp3` },
              { name: "hook_all", src: `${quizSoundsDir}/q4/s3/hook_all.mp3` }
            ],
            soundPosition: "last",
          },
          S4: {
            question: {
              english: `${question.s4.english}`,
              korean: `${question.s4.korean}`
            },
            sounds: [
              { name: "hook_1", src: `${quizSoundsDir}/q4/s4/hook_1.mp3` },
              { name: "hook_2", src: `${quizSoundsDir}/q4/s4/hook_2.mp3` },
              { name: "hook_3", src: `${quizSoundsDir}/q4/s4/hook_3.mp3` },
              { name: "hook_all", src: `${quizSoundsDir}/q4/s4/hook_all.mp3` }
            ]
          }
        }
      },
      Q5: {
        quizId: "Q5",
        bg: `${activityDir}/quiz_bg.png`,
        word: "seven",
        images: [
          { name: "robot", src: `${quizImagesDir}/q5/robot.png` },
          { name: "seven", src: `${quizImagesDir}/q5/seven.png` },
          { name: "wagon", src: `${quizImagesDir}/q5/wagon.png` }
        ],
        screenOrder: ["S1", "S2", "S3", "S4"],
        screenMap: {
          S1: {
            question: {
              english: `${question.s1.english}`,
              korean: `${question.s1.korean}`
            },
            sounds: [
              { name: "robot_fake", src: `${quizSoundsDir}/q5/s1/robot_fake.mp3` },
              { name: "seven", src: `${quizSoundsDir}/q5/s1/seven.mp3` },
              { name: "wagon", src: `${quizSoundsDir}/q5/s1/wagon.mp3` }
            ],
            correct: "seven",
            soundExample: { name: "v", src: `${quizSoundsDir}/q5/s1/v.mp3` },
          },
          S2: {
            question: {
              english: `${question.s2.english}`,
              korean: `${question.s2.korean}`
            },
            sounds: [
              { name: "b", src: `${quizSoundsDir}/q5/s2/b.mp3` },
              { name: "g", src: `${quizSoundsDir}/q5/s2/g.mp3` },
              { name: "v", src: `${quizSoundsDir}/q5/s2/v.mp3` }
            ],
            correct: "v",
            soundCorrect: { name: "seven", src: `${quizSoundsDir}/q5/s2/seven.mp3` },
          },
          S3: {
            question: {
              english: `${question.s3.english}`,
              korean: `${question.s3.korean}`
            },
            sounds: [
              { name: "seven_1", src: `${quizSoundsDir}/q5/s3/seven_1.mp3` },
              { name: "seven_2", src: `${quizSoundsDir}/q5/s3/seven_2.mp3` },
              { name: "seven_3", src: `${quizSoundsDir}/q5/s3/seven_3.mp3` },
              { name: "seven_4", src: `${quizSoundsDir}/q5/s3/seven_4.mp3` },
              { name: "seven_all", src: `${quizSoundsDir}/q5/s3/seven_all.mp3` }
            ],
            soundPosition: "middle",
          },
          S4: {
            question: {
              english: `${question.s4.english}`,
              korean: `${question.s4.korean}`
            },
            sounds: [
              { name: "seven_1", src: `${quizSoundsDir}/q5/s4/seven_1.mp3` },
              { name: "seven_2", src: `${quizSoundsDir}/q5/s4/seven_2.mp3` },
              { name: "seven_3", src: `${quizSoundsDir}/q5/s4/seven_3.mp3` },
              { name: "seven_4", src: `${quizSoundsDir}/q5/s4/seven_4.mp3` },
              { name: "seven_all", src: `${quizSoundsDir}/q5/s4/seven_all.mp3` }
            ]
          }
        }
      },
      Q6: {
        quizId: "Q6",
        bg: `${activityDir}/quiz_bg.png`,
        word: "peanut",
        images: [
          { name: "camel", src: `${quizImagesDir}/q6/camel.png` },
          { name: "peanut", src: `${quizImagesDir}/q6/peanut.png` },
          { name: "water_수정전", src: `${quizImagesDir}/q6/water_수정전.png` }
        ]
        ,
        screenOrder: ["S1", "S2", "S3", "S4"],
        screenMap: {
          S1: {
            question: {
              english: `${question.s1.english}`,
              korean: `${question.s1.korean}`
            },
            sounds: [
              { name: "camel", src: `${quizSoundsDir}/q6/s1/camel.mp3` },
              { name: "peanut", src: `${quizSoundsDir}/q6/s1/peanut.mp3` },
              { name: "water", src: `${quizSoundsDir}/q6/s1/water.mp3` }
            ],
            correct: "peanut",
            soundExample: { name: "n", src: `${quizSoundsDir}/q6/s1/n.mp3` },
          },
          S2: {
            question: {
              english: `${question.s2.english}`,
              korean: `${question.s2.korean}`
            },
            sounds: [
              { name: "m", src: `${quizSoundsDir}/q6/s2/m.mp3` },
              { name: "n", src: `${quizSoundsDir}/q6/s2/n.mp3` },
              { name: "t", src: `${quizSoundsDir}/q6/s2/t.mp3` }
            ],
            correct: "t",
            soundCorrect: { name: "peanut", src: `${quizSoundsDir}/q6/s2/peanut.mp3` },
          },
          S3: {
            question: {
              english: `${question.s3.english}`,
              korean: `${question.s3.korean}`
            },
            sounds: [
              { name: "peanut_1", src: `${quizSoundsDir}/q6/s3/peanut_1.mp3` },
              { name: "peanut_2", src: `${quizSoundsDir}/q6/s3/peanut_2.mp3` },
              { name: "peanut_3", src: `${quizSoundsDir}/q6/s3/peanut_3.mp3` },
              { name: "peanut_4", src: `${quizSoundsDir}/q6/s3/peanut_4.mp3` },
              { name: "peanut_5", src: `${quizSoundsDir}/q6/s3/peanut_5.mp3` },
              { name: "peanut_all", src: `${quizSoundsDir}/q6/s3/peanut_all.mp3` }
            ],
            soundPosition: "last",
          },
          S4: {
            question: {
              english: `${question.s4.english}`,
              korean: `${question.s4.korean}`
            },
            sounds: [
              { name: "peanut_1", src: `${quizSoundsDir}/q6/s4/peanut_1.mp3` },
              { name: "peanut_2", src: `${quizSoundsDir}/q6/s4/peanut_2.mp3` },
              { name: "peanut_3", src: `${quizSoundsDir}/q6/s4/peanut_3.mp3` },
              { name: "peanut_4", src: `${quizSoundsDir}/q6/s4/peanut_4.mp3` },
              { name: "peanut_5", src: `${quizSoundsDir}/q6/s4/peanut_5.mp3` },
              { name: "peanut_all", src: `${quizSoundsDir}/q6/s4/peanut_all.mp3` }
            ]
          }
        }
      }
    }
  }
}

export default data;