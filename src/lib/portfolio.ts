export type PortfolioData = {
  name: string;
  role: string;
  contact: {
    phone: string;
    email: string;
    website: string;
    location: string;
  };
  profile: string;
  researchInterests: string;
  skills: Array<{ name: string; level: string }>;
  workExperience: Array<{
    org: string;
    title: string;
    period: string;
    summary: string;
  }>;
  educations: Array<{ degree: string; school: string; major: string; period: string }>;
  languages: Array<{ name: string; level: string }>;
};

// `docs/snu-dahee-portfolio.md` 기반 데이터
export const portfolio: PortfolioData = {
  name: "정다희",
  role: "MEDIA COMMUNICATION RESEARCHER",
  contact: {
    phone: "010-1234-1234",
    email: "dahee.jung@example.com",
    website: "www.daheejung.com",
    location: "Seoul, South Korea",
  },
  profile:
    "미디어와 커뮤니케이션 분야의 연구를 수행하며 디지털 미디어 환경과 이용자 행동에 대한 분석 역량을 보유한 연구자입니다. 데이터 기반의 연구를 통해 사회적 현상을 이해하고 실질적인 인사이트를 도출하는 것을 목표로 합니다. 객관성과 윤리성을 연구의 핵심 가치로 삼으며, 정량·정성 연구를 균형 있게 활용합니다. 협업 과정에서 다양한 관점을 통합하여 문제를 분석하고 해결하는 능력이 강점입니다. 변화하는 미디어 산업과 기술 발전이 사회에 미치는 영향에 깊은 관심을 가지고 있습니다.",
  researchInterests:
    "온라인 커뮤니티 내 네트워크 구조, 개인 및 집단의 사용자 정체성 형성, 그리고 감정 교류 메커니즘에 대한 연구에 깊은 관심을 가지고 있습니다. 다양한 온라인 환경에서 이용자들이 어떻게 상호작용하며, 이 과정에서 감정과 정보가 어떠한 방식으로 확산되고 집단 정체성이 구축되는지 탐구합니다. 이를 통해 온라인 커뮤니티의 사회적 연결망과 심리적 효과를 분석하는 연구를 지속적으로 수행하고 있습니다.",
  skills: [
    { name: "미디어 데이터 분석", level: "★★★★★" },
    { name: "커뮤니케이션 연구 설계", level: "★★★★★" },
    { name: "통계 분석 및 시각화", level: "★★★★☆" },
  ],
  workExperience: [
    {
      org: "한국미디어연구원",
      title: "선임연구원",
      period: "2023/03 ~ 2026/06",
      summary:
        "디지털 플랫폼 이용 행태와 미디어 소비 패턴에 관한 연구 프로젝트를 수행하였으며, 설문조사 및 데이터 분석을 통해 정책 제언을 도출했습니다. 연구 결과를 학술지와 컨퍼런스에 발표하고 다양한 이해관계자와 협력하여 연구 성과 확산에 기여했습니다.",
    },
    {
      org: "미래커뮤니케이션랩",
      title: "연구원",
      period: "2020/01 ~ 2023/02",
      summary:
        "소셜미디어 이용자 행동 연구와 온라인 여론 분석 프로젝트를 담당했습니다. 정량 분석과 인터뷰 연구를 병행하여 이용자 경험을 다각적으로 해석하고 연구 보고서를 작성했습니다.",
    },
    {
      org: "디지털사회연구센터",
      title: "연구보조원",
      period: "2018/03 ~ 2019/12",
      summary:
        "미디어 영향력 측정 및 콘텐츠 분석 업무를 지원했습니다. 데이터 수집과 코딩 작업을 수행하며 연구 방법론에 대한 실무 경험을 축적했습니다.",
    },
  ],
  educations: [
    {
      degree: "Master of Arts",
      school: "서울대학교",
      major: "미디어학",
      period: "2026/03 ~ 2028/02",
    },
    {
      degree: "Bachelor of Arts",
      school: "중앙대학교",
      major: "사회회학",
      period: "2018/03 ~ 2024/02",
    },
  ],
  languages: [
    { name: "한국어", level: "★★★★★" },
    { name: "영어", level: "★★★★☆" },
    { name: "일본어", level: "★★★☆☆" },
  ],
};

