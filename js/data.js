/**
 * 小说角色数据
 * 结构: categories[] -> subCategories[] -> characters[]
 * 注意：这是给 <script src="js/data.js"> 用的（非 module）
 */

window.NOVEL_DATA = {
  categories: [
    {
      id: "xianmen",
      name: "五大仙门",
      subtitle: "正道之光，守护苍生",
      icon: "⚔️",
      color: "#c9a84c",
      bgGradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
      subCategories: [
        {
          id: "jiangjiia",
          name: "涂州姜家",
          desc: "笛箫纵鸟，琴瑟控兽。以乐器与灵兽组合闻名的涂州仙门。",
          characters: [
            {
              id: "0001",
              name: "姜小满",
              title: "涂州姜家",
              gender: "女",
              desc: "宅居在家、爱看话本的怪病独女，传闻与人说话超十个字会晕倒。",
              attributes: {
                年龄: "17",
                身高: "162",
                祖籍: "涂州",
                武器: "笛"
              },
              relations: [
                { name: "凌司辰", relation: "恋人", charId: null },
                { name: "霖光", relation: "前世今生", charId: null },
                { name: "羽霜", relation: "好友", charId: null },
                { name: "千炀", relation: "好友", charId: null },
                { name: "姜清竹", relation: "父亲", charId: "0004" },
                { name: "莫廉", relation: "大师兄", charId: "0002" },
                { name: "洛雪茗", relation: "师姐", charId: "0003" }
              ]
            },
            {
              id: "0002",
              name: "莫廉",
              title: "涂州姜家",
              gender: "男",
              desc: "姜清竹的大弟子，姜家大师兄，为人谦逊有礼，人称【凤箫君子】。",
              attributes: {
                年龄: "29",
                身高: "182",
                祖籍: "皇都",
                武器: "箫"
              },
              relations: [
                { name: "姜清竹", relation: "师父", charId: "0004" },
                { name: "姜小满", relation: "小师妹", charId: "0001" },
                { name: "文梦瑶", relation: "初恋", charId: null },
                { name: "洛雪茗", relation: "恋人", charId: "0003" }
              ]
            },
            {
              id: "0003",
              name: "洛雪茗",
              title: "涂州姜家",
              gender: "女",
              desc: "涂州第一美人，因相貌脱俗而在各大仙门追求者众多，然为人淡漠冰冷。",
              attributes: {
                年龄: "24",
                身高: "168",
                祖籍: "祁州",
                武器: "箫"
              },
              relations: [
                { name: "姜清竹", relation: "师父", charId: "0004" },
                { name: "姜小满", relation: "小师妹", charId: "0001" },
                { name: "莫廉", relation: "恋人", charId: "0002" }
              ]
            },
            {
              id: "0004",
              name: "姜清竹",
              title: "涂州姜家",
              gender: "男",
              desc: "性格随和的姜家现任宗主。",
              attributes: {
                年龄: "44",
                身高: "178",
                祖籍: "涂州",
                武器: "琴"
              },
              relations: [
                { name: "姜小满", relation: "女儿", charId: "0001" },
                { name: "荆藜", relation: "修侣", charId: "0012" },
                { name: "莫廉", relation: "得意弟子", charId: "0002" },
                { name: "凌问天", relation: "好友", charId: null }
              ]
            },

            {
              id: "0005",
              name: "姜榕",
              title: "涂州姜家",
              gender: "女",
              desc: "姜清竹的姐姐，姜家众弟子的师姑，人称【铁娘子】。",
              attributes: {
                年龄: "45",
                身高: "167",
                祖籍: "涂州",
                武器: "琵琶"
              },
              relations: [
                { name: "姜小满", relation: "侄女", charId: "0001" },
                { name: "姜清竹", relation: "弟弟", charId: "0004" },
                { name: "文四娘", relation: "好友", charId: null },
                { name: "岑三变", relation: "知己", charId: null }
              ]
            },

            {
              id: "0006",
              name: "余萝",
              title: "涂州姜家",
              gender: "女",
              desc: "分组武赛常拿第一的姜家得意门生。",
              attributes: {
                年龄: "25",
                身高: "170",
                祖籍: "扬州",
                武器: "笙"
              },
              relations: [
                { name: "姜清竹", relation: "师父", charId: "0004" },
                { name: "莫廉", relation: "大师兄", charId: "0002" },
                { name: "姜小满", relation: "小师妹", charId: "0001" },
                { name: "洛雪茗", relation: "好友", charId: "0003" }
              ]
            },

            {
              id: "0007",
              name: "齐茵",
              title: "涂州姜家",
              gender: "女",
              desc: "娴静不爱争斗的姜家修士。",
              attributes: {
                年龄: "24",
                身高: "165",
                祖籍: "西南一带",
                武器: "琴"
              },
              relations: [
                { name: "姜清竹", relation: "师父", charId: "0004" },
                { name: "莫廉", relation: "大师兄", charId: "0002" },
                { name: "姜小满", relation: "小师妹", charId: "0001" },
                { name: "余萝", relation: "好友", charId: "0006" }
              ]
            },

            {
              id: "0008",
              name: "冯梨儿",
              title: "涂州姜家",
              gender: "女",
              desc: "姜小满同年岁的小师姐，活泼好动。",
              attributes: {
                年龄: "18",
                身高: "161",
                祖籍: "涂州",
                武器: "笛"
              },
              relations: [
                { name: "姜清竹", relation: "师父", charId: "0004" },
                { name: "白顺", relation: "修侣", charId: "0009" },
                { name: "姜小满", relation: "好友", charId: "0001" }
              ]
            },

            {
              id: "0009",
              name: "白顺",
              title: "涂州姜家",
              gender: "男",
              desc: "擅长主锋的姜家修士。",
              attributes: {
                年龄: "20",
                身高: "175",
                祖籍: "沧州",
                武器: "笙"
              },
              relations: [
                { name: "姜清竹", relation: "师父", charId: "0004" },
                { name: "冯梨儿", relation: "修侣", charId: "0008" },
                { name: "莫廉", relation: "大师兄", charId: "0002" }
              ]
            },

            {
              id: "0010",
              name: "王铮",
              title: "涂州姜家",
              gender: "男",
              desc: "姜家修士。",
              attributes: {
                年龄: "24",
                身高: "180",
                祖籍: "幽州",
                武器: "筝"
              },
              relations: [
                { name: "姜清竹", relation: "师父", charId: "0004" },
                { name: "姜小满", relation: "小师妹", charId: "0001" },
                { name: "余萝", relation: "暗恋", charId: "0006" }
              ]
            },

            {
              id: "0011",
              name: "秦云昭",
              title: "涂州姜家",
              gender: "男",
              desc: "姜家修士。",
              attributes: {
                年龄: "23",
                身高: "177",
                祖籍: "涂州",
                武器: "鼓"
              },
              relations: [
                { name: "姜清竹", relation: "师父", charId: "0004" },
                { name: "姜小满", relation: "小师妹", charId: "0001" },
                { name: "莫廉", relation: "大师兄", charId: "0002" }
              ]
            },

            {
              id: "0012",
              name: "荆藜",
              title: "涂州姜家",
              gender: "女",
              desc: "姜小满的母亲，曾经【疗愈二圣】之一，已故。",
              attributes: {
                年龄: "终年22",
                身高: "165",
                祖籍: "涂州",
                武器: "琴"
              },
              relations: [
                { name: "姜清竹", relation: "修侣", charId: "0004" },
                { name: "姜小满", relation: "女儿", charId: "0001" },
                { name: "荆芸", relation: "妹妹", charId: "0013" }
              ]
            },

            {
              id: "0013",
              name: "荆芸",
              title: "云岭雅舍",
              gender: "女",
              desc: "姜小满的小姨，重伤未醒。",
              attributes: {
                年龄: "38",
                身高: "164",
                祖籍: "涂州",
                武器: "筝"
              },
              relations: [
                { name: "裘万里", relation: "修侣", charId: "0014" },
                { name: "荆藜", relation: "姐姐", charId: "0012" },
                { name: "姜清竹", relation: "师兄", charId: "0004" }
              ]
            },

            {
              id: "0014",
              name: "裘万里",
              title: "云岭雅舍",
              gender: "男",
              desc: "姜小满的小姨丈，曾经【疗愈二圣】之一，已退宗。",
              attributes: {
                年龄: "37",
                身高: "170",
                祖籍: "苏州",
                武器: "琴"
              },
              relations: [
                { name: "荆芸", relation: "修侣", charId: "0013" },
                { name: "姜清竹", relation: "师兄", charId: "0004" },
                { name: "姜榕", relation: "好友", charId: "0005" }
              ]
            },

            {
              id: "0015",
              name: "姜淮鹤",
              title: "涂州姜家",
              gender: "男",
              desc: "姜小满的翁翁，前任宗主，已故。",
              attributes: {
                年龄: "终年70",
                身高: "175",
                祖籍: "涂州",
                武器: "埙"
              },
              relations: [
                { name: "姜清竹", relation: "儿子", charId: "0004" },
                { name: "姜小满", relation: "孙女", charId: "0001" },
                { name: "裘万里", relation: "徒弟", charId: "0014" }
              ]
            }
          ]
        },

        {
          id: "lingjia",
          name: "岳山凌家",
          desc: "岳山之巅，善使刀与剑、攻法独步天下的强大仙宗。",
          characters: [
            {
              id: "0016",
              name: "凌司辰",
              title: "岳山凌家",
              gender: "男",
              desc: "风华绝代的凌家二公子，相貌实力皆为仙门佼佼，剑法为自己开创的【邀月剑法】，被称为”仙门最快的剑“",
              attributes: {
                年龄: "18",
                身高: "184",
                祖籍: "岳山",
                武器: "寒星剑"
              },
              relations: [
                { name: "姜小满", relation: "恋人", charId: "0001" },
                { name: "凌北风", relation: "兄长", charId: "0017" },
                { name: "古木真人", relation: "师父", charId: "0029" },
                { name: "凌问天", relation: "舅舅", charId: "0018" },
                { name: "凌蝶衣", relation: "母亲", charId: "0039" },
                { name: "归尘", relation: "父亲", charId: null }
              ]
            },
            {
              id: "0017",
              name: "凌北风",
              title: "岳山凌家",
              gender: "男",
              desc: "凌家大公子。拥有【狂影刀】【黑阎罗】【斩太岁】等多重称号的当今仙门最强者，不是正在诛魔，就是...",
              attributes: {
                年龄: "26",
                身高: "188",
                祖籍: "岳山",
                武器: "玄铁大刀、白玉长刀",
              },
              relations: [
                { name: "羽霜", relation: "爱慕", charId: null },
                { name: "凌司辰", relation: "表弟", charId: "0016" },
                { name: "凌问天", relation: "父亲", charId: "0018" },
                { name: "甘丽娘", relation: "母亲", charId: "0019" },
                { name: "向鼎", relation: "跟班", charId: "0021" },
                { name: "云海战神", relation: "师父", charId: null },
              ],
            },
            {
              id: "0018",
              name: "凌问天",
              title: "岳山凌家",
              gender: "男",
              desc: "凌家现任宗主，制定了严苛的凌家门规。",
              attributes: {
                年龄: "60",
                身高: "185",
                祖籍: "岳山",
                武器: "镶玉长剑",
              },
              relations: [
                { name: "甘丽娘", relation: "修侣", charId: "0019" },
                { name: "凌北风", relation: "长子", charId: "0017" },
                { name: "凌北照", relation: "次子", charId: "0020" },
                { name: "凌司辰", relation: "外甥", charId: "0016" },
                { name: "凌蝶衣", relation: "妹妹", charId: "0039" },
                { name: "姜清竹", relation: "好友", charId: "0004" },
              ],
            },
            {
              id: "0019",
              name: "甘丽娘",
              title: "岳山凌家",
              gender: "女",
              desc: "凌家宗主夫人，叱诧风云的甘夫人。",
              attributes: {
                年龄: "43",
                身高: "175",
                祖籍: "岳山",
                武器: "白雪刀",
              },
              relations: [
                { name: "凌问天", relation: "修侣", charId: "0018" },
                { name: "凌北风", relation: "长子", charId: "0017" },
                { name: "凌北照", relation: "次子", charId: "0020" },
                { name: "凌司辰", relation: "外甥", charId: "0016" },
              ],
            },
            {
              id: "0020",
              name: "凌北照",
              title: "岳山凌家",
              gender: "男",
              desc: "凌家三公子。",
              attributes: {
                年龄: "7",
                身高: "130",
                祖籍: "岳山",
                武器: "",
              },
              relations: [
                { name: "凌问天", relation: "父亲", charId: "0018" },
                { name: "甘丽娘", relation: "母亲", charId: "0019" },
                { name: "凌北风", relation: "大哥", charId: "0017" },
                { name: "凌司辰", relation: "二哥", charId: "0016" },
              ],
            },
            {
              id: "0021",
              name: "向鼎",
              title: "岳山凌家",
              gender: "男",
              desc: "爱穿花袍，人称【阴阳剑】，实力强大。",
              attributes: {
                年龄: "22",
                身高: "184",
                祖籍: "皇都",
                武器: "阴阳双剑",
              },
              relations: [
                { name: "凌北风", relation: "追随", charId: "0017" },
                { name: "月鹿真人", relation: "师父", charId: "0030" },
                { name: "宋秉伦", relation: "好友", charId: "0022" },
                { name: "向秀", relation: "父亲", charId: null },
                { name: "向珣", relation: "弟弟", charId: null },
              ],
            },
            {
              id: "0022",
              name: "宋秉伦",
              title: "岳山凌家",
              gender: "男",
              desc: "喜欢小动物的凌家刀修。",
              attributes: {
                年龄: "21",
                身高: "180",
                祖籍: "丰州",
                武器: "弯刀",
              },
              relations: [
                { name: "凌北风", relation: "追随", charId: "0017" },
                { name: "向鼎", relation: "好友", charId: "0021" },
              ],
            },
            {
              id: "0023",
              name: "荆一鸣",
              title: "岳山凌家",
              gender: "男",
              desc: "家境优渥却实力平凡的凌家剑修。",
              attributes: {
                年龄: "17",
                身高: "170",
                祖籍: "幽州",
                武器: "银剑",
              },
              relations: [
                { name: "凌司辰", relation: "好友、仇恨", charId: "0016" },
                { name: "姜小满", relation: "表妹", charId: "0001" },
                { name: "甘丽娘", relation: "大姨", charId: "0019" },
                { name: "凌北风", relation: "表兄", charId: "0017" },
              ],
            },
            {
              id: "0024",
              name: "颜浚",
              title: "岳山凌家",
              gender: "男",
              desc: "凌家修士。",
              attributes: {
                年龄: "15",
                身高: "175",
                祖籍: "沧州",
                武器: "银剑",
              },
              relations: [{ name: "凌司辰", relation: "追随", charId: "0016" }],
            },
            {
              id: "0025",
              name: "魏笛",
              title: "岳山凌家",
              gender: "男",
              desc: "凌家修士。",
              attributes: {
                年龄: "20",
                身高: "186",
                祖籍: "丰州",
                武器: "长刀",
              },
              relations: [{ name: "凌北风", relation: "追随", charId: "0017" }],
            },
            {
              id: "0026",
              name: "穆弘",
              title: "岳山凌家",
              gender: "男",
              desc: "凌家修士。",
              attributes: {
                年龄: "19",
                身高: "178",
                祖籍: "幽州",
                武器: "长刀",
              },
              relations: [{ name: "凌北风", relation: "追随", charId: "0017" }],
            },
            {
              id: "0027",
              name: "苏娴",
              title: "岳山凌家",
              gender: "女",
              desc: "凌家修士。",
              attributes: {
                年龄: "17",
                身高: "165",
                祖籍: "皇都",
                武器: "银剑",
              },
              relations: [{ name: "凌司辰", relation: "爱慕", charId: "0016" }],
            },
            {
              id: "0028",
              name: "宋渺",
              title: "岳山凌家",
              gender: "女",
              desc: "凌家修士。",
              attributes: {
                年龄: "22",
                身高: "168",
                祖籍: "幽州",
                武器: "长刀",
              },
              relations: [],
            },
          ],
        },

        {
          id: "wenjia",
          name: "青州文家",
          desc: "（待补充）",
          characters: [
            {
              id: "placeholder_wenjia",
              name: "待补充",
              title: "青州文家",
              desc: "该门派人物尚未整理。",
              attributes: {},
              relations: []
            }
          ]
        },
        {
          id: "xuanyangzong",
          name: "太衡山玄阳宗",
          desc: "（待补充）",
          characters: [
            {
              id: "placeholder_xuanyangzong",
              name: "待补充",
              title: "玄阳宗",
              desc: "该门派人物尚未整理。",
              attributes: {},
              relations: []
            }
          ]
        },
        {
          id: "yuqingmen",
          name: "昆仑玉清门",
          desc: "（待补充）",
          characters: [
            {
              id: "placeholder_yuqingmen",
              name: "待补充",
              title: "玉清门",
              desc: "该门派人物尚未整理。",
              attributes: {},
              relations: []
            }
          ]
        }
      ]
    },

    {
      id: "mojie",
      name: "魔界四渊",
      subtitle: "被诅咒缠绕的异界大地",
      icon: "⚡",
      color: "#e74c3c",
      bgGradient: "linear-gradient(135deg,#1a0000 0%,#2d0a0a 50%,#3d1414 100%)",
      subCategories: [
        {
          id: "dongyuan",
          name: "东渊",
          desc: "傍黑海而生，气候阴寒",
          characters: [
            {
              id: "placeholder_dongyuan",
              name: "待补充",
              title: "东渊",
              desc: "东渊人物待补充。",
              attributes: {},
              relations: []
            }
          ]
        },
        {
          id: "beiyuan",
          name: "北渊",
          desc: "最早诞生的古老大地，神山之下的黄天厚土",
          characters: [
            {
              id: "placeholder_beiyuan",
              name: "待补充",
              title: "北渊",
              desc: "北渊人物待补充。",
              attributes: {},
              relations: []
            }
          ]
        },
        {
          id: "xiyuan",
          name: "西渊",
          desc: "西方焰渊，烈焰焚天",
          characters: [
            {
              id: "placeholder_xiyuan",
              name: "待补充",
              title: "西渊",
              desc: "西渊人物待补充。",
              attributes: {},
              relations: []
            }
          ]
        },
        {
          id: "nanyuan",
          name: "南渊",
          desc: "最晚出现于黑海中央的奇迹大陆",
          characters: [
            {
              id: "placeholder_nanyuan",
              name: "待补充",
              title: "南渊",
              desc: "南渊人物待补充。",
              attributes: {},
              relations: []
            }
          ]
        }
      ]
    },

    // ✅ 你新增的这些顶层阵营：统一成 subCategories 结构，避免 app.js 里 cat.subCategories.map 崩掉
    {
      id: "penglai",
      name: "仙界人物",
      subtitle: "仙道传承，永生极乐",
      icon: "✨",
      color: "#f1c40f",
      bgGradient: "linear-gradient(135deg,#1a0a2e 0%,#2d1b4e 50%,#44236e 100%)",
      subCategories: [
        {
          id: "penglai_all",
          name: "蓬莱仙界",
          desc: "仙界人物待整理。",
          characters: [
            {
              id: "placeholder_penglai",
              name: "待补充",
              title: "蓬莱仙界",
              desc: "仙界人物待整理。",
              attributes: {},
              relations: []
            }
          ]
        }
      ]
    },

    {
      id: "zhongyuan",
      name: "中原势力",
      subtitle: "中原九州，人间烟火",
      icon: "🏯",
      color: "#9b59b6",
      bgGradient: "linear-gradient(135deg,#0a1a0a 0%,#1a2e1a 50%,#143d14 100%)",
      subCategories: [
        {
          id: "zhongyuan_all",
          name: "中原势力",
          desc: "中原人物待整理。",
          characters: [
            {
              id: "placeholder_zhongyuan",
              name: "待补充",
              title: "中原势力",
              desc: "中原人物待整理。",
              attributes: {},
              relations: []
            }
          ]
        }
      ]
    },

    {
      id: "yizu",
      name: "大漠边境",
      subtitle: "遥远而神秘的异族之地",
      icon: "🐫",
      color: "#d4a373",
      bgGradient: "linear-gradient(135deg,#1a1500 0%,#2e2200 50%,#3d3000 100%)",
      subCategories: [
        {
          id: "yizu_all",
          name: "异族",
          desc: "异族人物待整理。",
          characters: [
            {
              id: "placeholder_yizu",
              name: "待补充",
              title: "异族",
              desc: "异族人物待整理。",
              attributes: {},
              relations: []
            }
          ]
        }
      ]
    }
  ]
};