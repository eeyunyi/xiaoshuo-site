/**
 * 小说角色数据
 * 结构: categories[] -> subCategories[] -> characters[]
 */
const NOVEL_DATA = {
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
          desc: "涂州第一世家，以剑道闻名天下",
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
                { name: "千炀", relation: "好友", charId:null},
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
    { name: "凌问天", relation: "好友", charId: null}
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
    { name: "文四娘", relation: "好友", charId:null },
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
          desc: "岳山之巅，刀法独步天下",
          characters: [
            {
              id: "lingsichen",
              name: "凌司辰",
              title: "岳山凌家",
              role: "核心角色",
              desc: "凌家少主，天纵奇才，性格高傲却不失正义。与姜小满亦敌亦友，是她修行路上最强的对手。",
              attributes: {
                身份: "凌家少主",
                修为: "元婴期",
                武器: "裂魂刀",
                性格: "高傲正义"
              },
              relations: [
                { name: "凌北风", relation: "兄长", charId: "lingbeifeng" },
                { name: "凌问天", relation: "祖父", charId: "lingwentian" },
                { name: "姜小满", relation: "宿敌", charId: "jiangxiaoman" }
              ]
            },
            {
              id: "lingbeifeng",
              name: "凌北风",
              title: "岳山凌家",
              role: "重要角色",
              desc: "凌家长子，沉默寡言但实力深不可测。对弟弟凌司辰极为照顾，暗中守护着凌家的安宁。",
              attributes: {
                身份: "凌家长子",
                修为: "元婴后期",
                武器: "北冥刀",
                性格: "沉默深邃"
              },
              relations: [
                { name: "凌司辰", relation: "弟弟", charId: "lingsichen" },
                { name: "凌问天", relation: "祖父", charId: "lingwentian" },
                { name: "洛雪茗", relation: "旧识", charId: "luoxueming" }
              ]
            },
            {
              id: "lingwentian",
              name: "凌问天",
              title: "岳山凌家",
              role: "重要角色",
              desc: "凌家老祖，传说中的化神强者。性格豪迈洒脱，年轻时曾游历天下，见多识广。",
              attributes: {
                身份: "凌家老祖",
                修为: "化神期",
                武器: "天问刀",
                性格: "豪迈洒脱"
              },
              relations: [
                { name: "凌司辰", relation: "孙子", charId: "lingsichen" },
                { name: "凌北风", relation: "孙子", charId: "lingbeifeng" }
              ]
            },
            {
              id: "lingyuxi",
              name: "凌雨汐",
              title: "岳山凌家",
              role: "重要角色",
              desc: "凌家的天才少女，擅长水属性法术，与凌司辰是青梅竹马，暗中倾心于他。",
              attributes: {
                身份: "凌家弟子",
                修为: "金丹期",
                武器: "水灵珠",
                性格: "活泼聪慧"
              },
              relations: [
                { name: "凌司辰", relation: "青梅竹马", charId: "lingsichen" },
                { name: "凌北风", relation: "师兄", charId: "lingbeifeng" }
              ]
            }
          ]
        },
        {
          id: "yunzong",
          name: "云霄宗",
          desc: "隐于云端，掌控天象雷霆",
          characters: [
            {
              id: "yunqinghe",
              name: "云清河",
              title: "云霄宗",
              role: "核心角色",
              desc: "云霄宗掌门首徒，为人温文尔雅，精通雷法。看似与世无争，实则心中自有丘壑。",
              attributes: {
                身份: "掌门首徒",
                修为: "元婴期",
                武器: "雷渊剑",
                性格: "温文尔雅"
              },
              relations: [
                { name: "姜小满", relation: "盟友", charId: "jiangxiaoman" }
              ]
            },
            {
              id: "yunmiaomiao",
              name: "云渺渺",
              title: "云霄宗",
              role: "重要角色",
              desc: "云霄宗宗主之女，古灵精怪，喜爱自由冒险。修习风系法术，行踪如风般飘忽不定。",
              attributes: {
                身份: "宗主之女",
                修为: "筑基期",
                武器: "风铃",
                性格: "古灵精怪"
              },
              relations: [
                { name: "云清河", relation: "师兄", charId: "yunqinghe" }
              ]
            },
            {
              id: "yunzhangmen",
              name: "云霆",
              title: "云霄宗",
              role: "重要角色",
              desc: "云霄宗宗主，修为通天，掌握最强雷法「天罚九重」。为人严厉却对弟子爱护有加。",
              attributes: {
                身份: "云霄宗宗主",
                修为: "化神期",
                武器: "雷神杖",
                性格: "严厉公正"
              },
              relations: [
                { name: "云渺渺", relation: "女儿", charId: "yunmiaomiao" },
                { name: "云清河", relation: "首徒", charId: "yunqinghe" }
              ]
            }
          ]
        },
        {
          id: "tianyige",
          name: "天医阁",
          desc: "悬壶济世，妙手回春",
          characters: [
            {
              id: "suyao",
              name: "苏瑶",
              title: "天医阁",
              role: "核心角色",
              desc: "天医阁首席弟子，医术冠绝天下。性格温和善良，立誓救治苍生疾苦。",
              attributes: {
                身份: "首席弟子",
                修为: "金丹期",
                武器: "玉针",
                性格: "温和善良"
              },
              relations: [
                { name: "姜小满", relation: "好友", charId: "jiangxiaoman" }
              ]
            },
            {
              id: "bailihuai",
              name: "百里槐",
              title: "天医阁",
              role: "重要角色",
              desc: "天医阁阁主，活了数百年的老神医。看似疯癫实则大智若愚，炼丹之术天下无双。",
              attributes: {
                身份: "天医阁阁主",
                修为: "化神期",
                武器: "丹炉",
                性格: "疯癫睿智"
              },
              relations: [
                { name: "苏瑶", relation: "弟子", charId: "suyao" }
              ]
            }
          ]
        },
        {
          id: "wanjianzong",
          name: "万剑宗",
          desc: "万剑归宗，剑气纵横三千里",
          characters: [
            {
              id: "gujianchen",
              name: "顾剑尘",
              title: "万剑宗",
              role: "核心角色",
              desc: "万剑宗天才剑修，号称「一剑破万法」。性格孤傲不群，唯对剑道有着极致的追求。",
              attributes: {
                身份: "天才剑修",
                修为: "元婴期",
                武器: "无名剑",
                性格: "孤傲执着"
              },
              relations: [
                { name: "姜小满", relation: "剑道之交", charId: "jiangxiaoman" },
                { name: "凌司辰", relation: "对手", charId: "lingsichen" }
              ]
            },
            {
              id: "yeqinglan",
              name: "叶青澜",
              title: "万剑宗",
              role: "重要角色",
              desc: "万剑宗宗主，传闻是当世剑道第一人。平日深居简出，一旦出手便是惊天动地。",
              attributes: {
                身份: "万剑宗宗主",
                修为: "大乘期",
                武器: "万剑归一",
                性格: "高深莫测"
              },
              relations: [
                { name: "顾剑尘", relation: "弟子", charId: "gujianchen" }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "mojie",
      name: "魔界四渊",
      subtitle: "被诅咒缠绕的异界大地",
      icon: "🔥",
      color: "#e74c3c",
      bgGradient: "linear-gradient(135deg, #1a0000 0%, #2d0a0a 50%, #3d1414 100%)",
      subCategories: [
        {
          id: "dongyuan",
          name: "东渊",
          desc: "东方深渊，主掌风暴雷霆",
          characters: [
            {
              id: "linguang",
              name: "霖光",
              title: "东渊",
              role: "渊主",
              desc: "东渊之主，性格阴沉却极有谋略。掌控风暴之力，是魔界最具战略头脑的渊主。",
              attributes: {
                身份: "东渊渊主",
                修为: "化神期",
                武器: "雷霆之眼",
                性格: "阴沉多谋"
              },
              relations: [
                { name: "卷雨", relation: "部下", charId: "juanyu" },
                { name: "羽霜", relation: "部下", charId: "yushuang" },
                { name: "归尘", relation: "同僚/宿敌", charId: "guichen" }
              ]
            },
            {
              id: "juanyu",
              name: "卷雨",
              title: "东渊",
              role: "核心角色",
              desc: "东渊第一战将，暴烈如狂风骤雨。对霖光忠心耿耿，战场上所向披靡。",
              attributes: {
                身份: "东渊战将",
                修为: "元婴期",
                武器: "暴风镰",
                性格: "暴烈忠诚"
              },
              relations: [
                { name: "霖光", relation: "主上", charId: "linguang" },
                { name: "羽霜", relation: "同僚", charId: "yushuang" }
              ]
            },
            {
              id: "yushuang",
              name: "羽霜",
              title: "东渊",
              role: "核心角色",
              desc: "东渊军师，冷静理智，善于暗中布局。外表冷若冰霜，内心却有着不为人知的温柔。",
              attributes: {
                身份: "东渊军师",
                修为: "元婴期",
                武器: "霜羽扇",
                性格: "冷静理智"
              },
              relations: [
                { name: "霖光", relation: "主上", charId: "linguang" },
                { name: "卷雨", relation: "同僚", charId: "juanyu" }
              ]
            },
            {
              id: "canming",
              name: "残冥",
              title: "东渊",
              role: "重要角色",
              desc: "东渊暗卫统领，行踪诡秘，擅长暗杀和情报收集。从不以真面目示人。",
              attributes: {
                身份: "暗卫统领",
                修为: "元婴期",
                武器: "影刃",
                性格: "神秘莫测"
              },
              relations: [
                { name: "霖光", relation: "主上", charId: "linguang" }
              ]
            }
          ]
        },
        {
          id: "beiyuan",
          name: "北渊",
          desc: "北方寒渊，冰封万里",
          characters: [
            {
              id: "guichen",
              name: "归尘",
              title: "北渊",
              role: "渊主",
              desc: "北渊之主，外冷内热的强者。曾是仙门弟子，因变故堕入魔道，心中始终存有一丝仁念。",
              attributes: {
                身份: "北渊渊主",
                修为: "化神期",
                武器: "玄冰锁链",
                性格: "外冷内热"
              },
              relations: [
                { name: "岩玦", relation: "部下", charId: "yanjue" },
                { name: "刺鸮", relation: "部下", charId: "cixiao" },
                { name: "霖光", relation: "同僚/宿敌", charId: "linguang" },
                { name: "姜小满", relation: "复杂", charId: "jiangxiaoman" }
              ]
            },
            {
              id: "yanjue",
              name: "岩玦",
              title: "北渊",
              role: "核心角色",
              desc: "北渊第一猛将，力大无穷，以一敌百。外表粗犷却心思细腻，是归尘最信任的左膀右臂。",
              attributes: {
                身份: "北渊猛将",
                修为: "元婴期",
                武器: "玄铁重锤",
                性格: "粗犷细腻"
              },
              relations: [
                { name: "归尘", relation: "主上", charId: "guichen" },
                { name: "刺鸮", relation: "同僚", charId: "cixiao" }
              ]
            },
            {
              id: "cixiao",
              name: "刺鸮",
              title: "北渊",
              role: "核心角色",
              desc: "北渊斥候长，身形矫健如鹰隼。善于侦查追踪，在北渊的广袤寒原上无人能逃过他的眼睛。",
              attributes: {
                身份: "斥候长",
                修为: "金丹期",
                武器: "千目弩",
                性格: "机警敏锐"
              },
              relations: [
                { name: "归尘", relation: "主上", charId: "guichen" },
                { name: "岩玦", relation: "同僚", charId: "yanjue" }
              ]
            },
            {
              id: "hanyue",
              name: "寒月",
              title: "北渊",
              role: "重要角色",
              desc: "北渊的神秘女子，掌控寒冰之术。据传她与归尘有着不为人知的过往。",
              attributes: {
                身份: "北渊高手",
                修为: "元婴期",
                武器: "冰魄琉璃",
                性格: "清冷孤高"
              },
              relations: [
                { name: "归尘", relation: "旧识", charId: "guichen" }
              ]
            }
          ]
        },
        {
          id: "xiyuan",
          name: "西渊",
          desc: "西方焰渊，烈焰焚天",
          characters: [
            {
              id: "yanwu",
              name: "焰舞",
              title: "西渊",
              role: "渊主",
              desc: "西渊之主，热情如火又残忍无情。掌控极焰之力，所到之处寸草不生。",
              attributes: {
                身份: "西渊渊主",
                修为: "化神期",
                武器: "焚天炎",
                性格: "狂热残忍"
              },
              relations: [
                { name: "霖光", relation: "同僚", charId: "linguang" },
                { name: "归尘", relation: "同僚", charId: "guichen" }
              ]
            },
            {
              id: "chitong",
              name: "赤瞳",
              title: "西渊",
              role: "核心角色",
              desc: "西渊副渊主，一双赤色瞳孔能看穿一切虚妄。冷酷无情，是焰舞最得力的助手。",
              attributes: {
                身份: "西渊副渊主",
                修为: "元婴后期",
                武器: "赤焰链",
                性格: "冷酷精明"
              },
              relations: [
                { name: "焰舞", relation: "主上", charId: "yanwu" }
              ]
            }
          ]
        },
        {
          id: "nanyuan",
          name: "南渊",
          desc: "南方毒渊，万毒汇聚",
          characters: [
            {
              id: "duluo",
              name: "独罗",
              title: "南渊",
              role: "渊主",
              desc: "南渊之主，精通百毒。看似温和有礼，实则心如蛇蝎，是四渊中最难以捉摸的存在。",
              attributes: {
                身份: "南渊渊主",
                修为: "化神期",
                武器: "万毒鼎",
                性格: "阴险狡诈"
              },
              relations: [
                { name: "霖光", relation: "同僚", charId: "linguang" },
                { name: "焰舞", relation: "同僚", charId: "yanwu" }
              ]
            },
            {
              id: "mianhuo",
              name: "绵蠖",
              title: "南渊",
              role: "核心角色",
              desc: "南渊炼毒师，能将任何毒物炼化为己用。面容清秀却手段毒辣，令人不寒而栗。",
              attributes: {
                身份: "南渊炼毒师",
                修为: "元婴期",
                武器: "毒蛊壶",
                性格: "清秀毒辣"
              },
              relations: [
                { name: "独罗", relation: "主上", charId: "duluo" }
              ]
            }
          ]
        }
      ]
    },
    {
   id: "shenzu",
      name: "蓬莱仙界",
      subtitle: "仙道传承，永生极乐",
      icon: "✨",
      color: "#f39c12",
      bgGradient: "linear-gradient(135deg, #1a0a2e 0%, #2d1b4e 50%, #44236e 100%)",
      subCategories: [
        {
          id: "tianhuang",
          name: "天荒",
          desc: "天之尽头，仙魔交界",
          characters: [
            {
              id: "taiyixianren",
              name: "太一真人",
              title: "天荒",
              role: "隐世强者",
              desc: "天荒最强者，传说已活过万年。超脱仙魔之争，只关心天地大道的奥秘。",
              attributes: {
                身份: "天荒守护者",
                修为: "渡劫期",
                武器: "太一拂尘",
                性格: "超然物外"
              },
              relations: []
            },
            {
              id: "lingjiu",
              name: "灵鸠",
              title: "天荒",
              role: "核心角色",
              desc: "天荒中的神秘少年，身世成谜。拥有操控时间碎片的特殊能力。",
              attributes: {
                身份: "神秘少年",
                修为: "不明",
                武器: "时光沙漏",
                性格: "天真好奇"
              },
              relations: [
                { name: "太一真人", relation: "师父", charId: "taiyixianren" }
              ]
            }
          ]
        },
        {
          id: "dihuang",
          name: "大漠",
          desc: "大地深处，古兽横行",
          characters: [
            {
              id: "shiyan",
              name: "石衍",
              title: "地荒",
              role: "核心角色",
              desc: "地荒的守护者，身躯如山岳般伟岸。与古兽为伴，性格质朴憨厚。",
              attributes: {
                身份: "地荒守护者",
                修为: "化神期",
                武器: "镇山印",
                性格: "质朴憨厚"
              },
              relations: []
            }
          ]
        },
        {
          id: "renhuang",
          name: "人荒",
          desc: "人族禁地，古老传承",
          characters: [
            {
              id: "gushangren",
              name: "古裳人",
              title: "人荒",
              role: "核心角色",
              desc: "人荒最后的传人，守护着上古人族的秘密。面容永远停留在少女模样。",
              attributes: {
                身份: "人荒传人",
                修为: "化神期",
                武器: "古裳卷",
                性格: "神秘温和"
              },
              relations: []
            }
          ]
        },
        {
          id: "xuhuang",
          name: "虚荒",
          desc: "虚无之境，空间裂缝",
          characters: [
            {
              id: "xuwu",
              name: "虚无",
              title: "虚荒",
              role: "核心角色",
              desc: "虚荒的意志化身，非人非妖，是空间法则的具现体。",
              attributes: {
                身份: "虚荒意志",
                修为: "超脱",
                武器: "虚空",
                性格: "无喜无悲"
              },
              relations: []
            }
          ]
        }
      ]
    },
    {
          id: "sanhuang",
      name: "中原势力",
      subtitle: "中原九州各地，皇都与其余门派",
      icon: "🌀",
      color: "#9b59b6",

      bgGradient: "linear-gradient(135deg, #0a1a0a 0%, #1a2e1a 50%, #143d14 100%)",
      subCategories: [
        {
          id: "youxia",
          name: "游侠",
          desc: "行走天涯，快意恩仇",
          characters: [
            {
              id: "fengyun",
              name: "风云",
              title: "游侠",
              role: "核心角色",
              desc: "江湖上赫赫有名的独行侠，来去如风，行侠仗义。无人知其真名来历。",
              attributes: {
                身份: "独行侠",
                修为: "元婴期",
                武器: "无鞘刀",
                性格: "洒脱不羁"
              },
              relations: [
                { name: "姜小满", relation: "恩人", charId: "jiangxiaoman" }
              ]
            }
          ]
        },
        {
          id: "shangren",
          name: "商人",
          desc: "行商天下，消息灵通",
          characters: [
            {
              id: "jinbaoer",
              name: "金宝儿",
              title: "商人",
              role: "重要角色",
              desc: "天下第一商行「聚宝阁」的少东家，虽是散修却富可敌国，消息网络遍布天下。",
              attributes: {
                身份: "聚宝阁少东家",
                修为: "筑基期",
                武器: "金算盘",
                性格: "精明圆滑"
              },
              relations: [
                { name: "姜小满", relation: "商业伙伴", charId: "jiangxiaoman" }
              ]
            }
          ]
        },
        {
          id: "yinshi",
          name: "隐士",
          desc: "避世隐居，深藏不露",
          characters: [
            {
              id: "wuming",
              name: "无名",
              title: "隐士",
              role: "重要角色",
              desc: "隐居山林的神秘老者，偶尔出山指点后辈。据传实力深不可测。",
              attributes: {
                身份: "隐世高人",
                修为: "大乘期",
                武器: "无",
                性格: "随性自在"
              },
              relations: []
            }
          ]
        },
        {
          id: "cike",
          name: "暗杀者",
          desc: "暗影之中，取人性命",
          characters: [
            {
              id: "yeying",
              name: "夜影",
              title: "暗杀者",
              role: "重要角色",
              desc: "江湖上最令人闻风丧胆的暗杀者，从未失手。身份成谜，赏金高的离谱。",
              attributes: {
                身份: "顶级暗杀者",
                修为: "元婴期",
                武器: "暗影匕首",
                性格: "冷酷无情"
              },
              relations: [
                { name: "归尘", relation: "不明", charId: "guichen" }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "jianghu",
      name: "大漠边境",
      subtitle: "遥远而神秘的异族之地",
      icon: "🍃",
      color: "#27ae60",

      bgGradient: "linear-gradient(135deg, #1a1500 0%, #2e2200 50%, #3d3000 100%)",
      subCategories: [
        {
          id: "longzu",
          name: "龙族",
          desc: "万兽之王，龙威天下",
          characters: [
            {
              id: "aoye",
              name: "敖夜",
              title: "龙族",
              role: "核心角色",
              desc: "龙族太子，化为人形后风华绝代。心高气傲，却被命运推向了与人族纠葛的漩涡。",
              attributes: {
                身份: "龙族太子",
                修为: "化神期",
                武器: "龙吟",
                性格: "高傲深情"
              },
              relations: [
                { name: "姜小满", relation: "复杂", charId: "jiangxiaoman" }
              ]
            },
            {
              id: "aoxing",
              name: "敖星",
              title: "龙族",
              role: "重要角色",
              desc: "龙族公主，敖夜之妹。性格跳脱可爱，偷偷溜出龙宫到人间游玩。",
              attributes: {
                身份: "龙族公主",
                修为: "金丹期",
                武器: "龙鳞扇",
                性格: "活泼跳脱"
              },
              relations: [
                { name: "敖夜", relation: "兄长", charId: "aoye" }
              ]
            }
          ]
        },
        {
          id: "fengzu",
          name: "凤族",
          desc: "涅槃重生，浴火永恒",
          characters: [
            {
              id: "fengming",
              name: "凤鸣",
              title: "凤族",
              role: "核心角色",
              desc: "凤族圣女，经历九次涅槃重生。每一世都在寻找遗失的记忆和她守护的人。",
              attributes: {
                身份: "凤族圣女",
                修为: "化神期",
                武器: "涅槃之火",
                性格: "坚毅深情"
              },
              relations: [
                { name: "敖夜", relation: "旧交", charId: "aoye" }
              ]
            }
          ]
        },
        {
          id: "qilinzu",
          name: "麒麟族",
          desc: "祥瑞之兽，天地守护",
          characters: [
            {
              id: "qilinzi",
              name: "麒麟子",
              title: "麒麟族",
              role: "重要角色",
              desc: "麒麟族最后的血脉，肩负着复兴一族的重任。为人正直善良，与世无争。",
              attributes: {
                身份: "麒麟族遗孤",
                修为: "元婴期",
                武器: "瑞光",
                性格: "正直善良"
              },
              relations: []
            }
          ]
        },
        {
          id: "yaozu",
          name: "妖族",
          desc: "万妖之盟，妖修之道",
          characters: [
            {
              id: "huji",
              name: "狐姬",
              title: "妖族",
              role: "核心角色",
              desc: "九尾狐一族的族长，魅惑天下无人能敌。看似妩媚实则有着铁血手腕。",
              attributes: {
                身份: "九尾狐族长",
                修为: "化神期",
                武器: "迷魂铃",
                性格: "妩媚铁血"
              },
              relations: [
                { name: "敖夜", relation: "盟友", charId: "aoye" }
              ]
            },
            {
              id: "bailang",
              name: "白狼",
              title: "妖族",
              role: "重要角色",
              desc: "狼族之王，忠义为先。与人族关系不错，是沟通人妖两族的桥梁。",
              attributes: {
                身份: "狼族之王",
                修为: "元婴后期",
                武器: "狼牙",
                性格: "忠义豪爽"
              },
              relations: [
                { name: "狐姬", relation: "盟友", charId: "huji" }
              ]
            }
          ]
        }
      ]
    }
  ]
};
