import React from "react";

const FIRST_PAGE_INFO = {
  MAIN: (
    <span>
      always
      <br />
      Recordly
    </span>
  ),
  DESCRIPTION: (
    <span>
      간편하게 메모를 작성하고 관리해보세요.
      <br />
      Recordly는 편리한 메모 관리 환경을 제공합니다.
    </span>
  ),
};

const SECOND_PAGE_INFO = {
  MAIN: (
    <span>
      자유롭게
      <br />
      표현하세요
    </span>
  ),
  DESCRIPTION: (
    <span>
      당신의 생각을 메모에 자유롭게 표현해보세요.
      <br />
      Recordly는 다양한 에디팅 도구를 제공합니다.
    </span>
  ),
};

const THIRD_PAGE_INFO = {
  MAIN: (
    <span>
      편리하게,
      <br />
      자동 태깅
    </span>
  ),
  DESCRIPTION: (
    <span>
      작성한 메모로부터 태그를 추천받아 보세요.
      <br />
      태그 추천과 함께, 관련 메모를 추천받을 수 있어요.
    </span>
  ),
};

export default { FIRST_PAGE_INFO, SECOND_PAGE_INFO, THIRD_PAGE_INFO };
