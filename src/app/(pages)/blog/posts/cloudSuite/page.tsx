"use client";
import * as S from "./styles";

import CloudSuitePostsContainer from "@/components/blog/cloudSuitePostsContainer/CloudSuitePostsContainer";
import { BlogHeader } from "@/components/blog/blogHeader/blogHeader";

export default function CloudSuite() {
  return (
    <S.Container>
      <BlogHeader />
      <CloudSuitePostsContainer />
    </S.Container>
  );
}
