export class CreateBlogDto {
  title: string;
  description?: string | null;
  image: string;
  path: string;
  date?: Date | string | null;
  catalogue?: string | null;
  text?: string | null;
  createdAt?: Date | string | null;
  createdBy?: number | null;
  updatedAt?: Date | string | null;
  updatedBy?: number | null;
  deletedAt?: Date | string | null;
  deletedBy?: number | null;
  seo: SeoCreateNestedOneWithoutBlogsInput;
  siteType: SiteTypeCreateNestedOneWithoutBlogsInput;
}

