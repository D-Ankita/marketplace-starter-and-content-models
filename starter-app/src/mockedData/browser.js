import { SetupWorker, rest, setupWorker } from "msw";
const { REACT_APP_BASE_URL } = process.env;

export const sidebarEntry = {
  title: "Content Models Import-New",
  summary: "Build content models using the preset framework",
  description:
    "<p>Contentstack is a headless content management system that provides flexibility in creating content models for a business portfolio website. A content model defines the structure and fields of the content that will be managed in the CMS. Here's a sample content model for a business portfolio website:</p><ol><li>Page: A page represents a web page on the website. It can have fields like title, description, URL, featured image, and content.</li><li>Portfolio Item: A portfolio item represents a project or work that the business has completed. It can have fields like title, description, category, featured image, and content.</li><li>Team Member: A team member represents a person who works at the business. It can have fields like name, position, bio, photo, and social media links.</li><li>Testimonial: A testimonial represents a quote or feedback from a customer. It can have fields like name, company, photo, and quote.</li><li>Blog Post: A blog post represents an article or news item on the website. It can have fields like title, author, featured image, content, and tags.</li></ol><p>This is just a sample content model, and it can be customized based on the specific needs of the business portfolio website. With Contentstack, you can easily create and manage different types of content and deliver them to any digital channel or device.</p>",
  installation_url:
    "#!/apps/643689a74623f70019b3d8ec/authorize?&client_id=GKrnTHU3KyZE0eFs&response_type=code&auto_select_organization=true&state=%7B%22starter%22%3A%22Content%20Model%22%2C%20%22contentModelDataId%22%3A%20%22blt530737ad8c6d9495%22%2C%20%22contentModelMetaId%22%3A%20%22blt08f223df5b562c50%22%2C%20%22contentModelName%22%3A%22ContentModelSideBar%22%7D",
  demo_url: "https://contentstack-nuxt3-starter-app.vercel.app/",
  banner_image: {
    uid: "blt0904f0930805beb4",
    created_at: "2023-03-08T11:20:24.106Z",
    updated_at: "2023-03-08T14:16:17.494Z",
    created_by: "bltbc7ce68b4804f62e",
    updated_by: "bltbc7ce68b4804f62e",
    content_type: "image/png",
    file_size: "50371",
    tags: [],
    filename: "BannerImage_Astro.png",
    url: "https://eu-images.contentstack.com/v3/assets/bltaa8aa87355a3e5ee/blt0904f0930805beb4/640898b1e4b9410f399e2138/BannerImage_Astro.png",
    ACL: [],
    is_dir: false,
    parent_uid: "blt7d1eeeec604bffe3",
    _version: 3,
    title: "Astro_starter.svg",
    description: "",
    dimension: {
      height: 512,
      width: 1024,
    },
    publish_details: [
      {
        environment: "blt0680c7a708ba5b1e",
        locale: "en-us",
        time: "2023-03-08T14:16:23.967Z",
        user: "bltbc7ce68b4804f62e",
        version: 3,
      },
      {
        environment: "bltdf63ecb55e00e84a",
        locale: "en-us",
        time: "2023-05-10T06:15:55.349Z",
        user: "bltcbebbeae13ef79dd",
        version: 3,
      },
      {
        environment: "blt4b47351c5fdf7e28",
        locale: "en-us",
        time: "2023-03-08T13:55:54.840Z",
        user: "bltbc7ce68b4804f62e",
        version: 2,
      },
    ],
  },
  built_by: [
    {
      _content_type_uid: "organizations",
      _version: 2,
      locale: "en-us",
      uid: "bltec929d731b1f9d85",
      ACL: {},
      _in_progress: false,
      badges: [],
      collections: [],
      created_at: "2022-03-29T11:12:21.999Z",
      created_by: "blt89b5b90cb9e7c645",
      description: "Contentstack - Headless CMS",
      linked_app: [],
      logo: {
        title: "Contentstack",
        uid: "bltd1599ef0db421778",
        created_by: "blt89b5b90cb9e7c645",
        updated_by: "blt89b5b90cb9e7c645",
        created_at: "2022-03-29T11:10:05.681Z",
        updated_at: "2022-03-29T11:10:05.681Z",
        content_type: "image/jpeg",
        file_size: "4734",
        filename: "1519866471156.jpeg",
        ACL: {},
        _version: 1,
        parent_uid: null,
        is_dir: false,
        tags: [],
        publish_details: {
          environment: "blt0b5712e5b06ac8b6",
          locale: "en-us",
          time: "2022-04-22T07:36:37.169Z",
          user: "bltd5e1f9e7bbbf5fff",
        },
        url: "https://eu-images.contentstack.com/v3/assets/blt8f94ebff857fe1ae/bltd1599ef0db421778/6242e90d5a824567f4f51602/1519866471156.jpeg",
      },
      metadata: {
        page_title: "",
        page_description: "",
        page_thumb: {
          parent_uid: "blt9dddaa4b9192231d",
          title: "Marketplace_Hero.jpg",
          uid: "blt2af4c7391167e253",
          created_by: "blt89b5b90cb9e7c645",
          updated_by: "bltb79b1c5ff2fe28ae",
          created_at: "2022-03-29T11:11:02.983Z",
          updated_at: "2022-05-24T14:04:24.338Z",
          content_type: "image/jpeg",
          file_size: "280744",
          filename: "CS_Opengraph_Marketplace.jpg",
          ACL: {},
          _version: 2,
          is_dir: false,
          tags: [],
          description: "",
          publish_details: {
            environment: "blt0b5712e5b06ac8b6",
            locale: "en-us",
            time: "2022-05-25T17:23:04.628Z",
            user: "blt576833d6ec5d5f50",
          },
          url: "https://eu-images.contentstack.com/v3/assets/blt8f94ebff857fe1ae/blt2af4c7391167e253/628ce5e8a9b6087bfc8997f1/CS_Opengraph_Marketplace.jpg",
        },
        twitter_title: "",
        twitter_description: "",
        opengraph_title: "",
        opengraph_description: "",
        canonical_url: "",
        json_ld: "",
        robots: "",
      },
      partner: true,
      partner_details: {
        categories: [],
        documentation_links: [],
        external_links: [],
        company_info: "",
        website: {
          title: "",
          href: "",
        },
        location: [],
        headquarters: "",
        consultants: "",
        projects: "",
        cta: {
          title: "",
          link: "",
        },
        services: "",
        use_cases: "",
        other_headlines: [],
        related_articles: [],
        video_section: {
          title: "",
          description: "",
          video_embed_code: "",
        },
        external_links_subtitle: "",
        login: {
          title: "",
          href: "",
        },
      },
      partner_facets: [],
      partner_type: [],
      tags: [],
      title: "Contentstack",
      updated_at: "2022-03-29T11:13:51.616Z",
      updated_by: "blt89b5b90cb9e7c645",
      url: "/marketplace/contentstack/",
      publish_details: {
        environment: "blt0b5712e5b06ac8b6",
        locale: "en-us",
        time: "2022-05-12T12:56:34.818Z",
        user: "bltd5e1f9e7bbbf5fff",
      },
    },
  ],
  category: [
    {
      _content_type_uid: "categories",
      _version: 3,
      locale: "en-us",
      uid: "blte953c795ff59241c",
      ACL: {},
      _in_progress: false,
      collection_type: ["Starters", "Apps", "Guides"],
      created_at: "2022-03-29T11:12:50.186Z",
      created_by: "blt89b5b90cb9e7c645",
      tags: [],
      title: "Development",
      updated_at: "2022-05-23T11:47:54.952Z",
      updated_by: "bltddfc4e31ebd52330",
      publish_details: {
        environment: "blt0b5712e5b06ac8b6",
        locale: "en-us",
        time: "2022-05-23T11:47:57.473Z",
        user: "bltddfc4e31ebd52330",
      },
    },
  ],
  screenshots: [
    {
      uid: "bltcd5b69a936efa07c",
      created_at: "2022-03-29T10:42:54.823Z",
      updated_at: "2022-03-29T10:42:54.823Z",
      created_by: "blt89b5b90cb9e7c645",
      updated_by: "blt89b5b90cb9e7c645",
      content_type: "image/png",
      file_size: "107631",
      tags: [],
      filename: "our-mission.png",
      url: "https://eu-images.contentstack.com/v3/assets/bltaa8aa87355a3e5ee/bltcd5b69a936efa07c/6242e2aebd6ed76963201879/our-mission.png",
      ACL: [],
      is_dir: false,
      parent_uid: "blt2d1ab05e89374ecc",
      _version: 1,
      title: "our-features.png",
      description: "",
      dimension: {
        height: 795,
        width: 1909,
      },
      publish_details: [
        {
          environment: "blt0680c7a708ba5b1e",
          locale: "en-us",
          time: "2022-03-30T06:45:23.222Z",
          user: "blt89b5b90cb9e7c645",
          version: 1,
        },
        {
          environment: "bltdf63ecb55e00e84a",
          locale: "en-us",
          time: "2023-05-10T06:15:55.544Z",
          user: "bltcbebbeae13ef79dd",
          version: 1,
        },
      ],
    },
    {
      uid: "blte4e9b8b888edacf4",
      created_at: "2022-03-29T10:43:43.499Z",
      updated_at: "2022-03-29T10:43:43.499Z",
      created_by: "blt89b5b90cb9e7c645",
      updated_by: "blt89b5b90cb9e7c645",
      content_type: "image/png",
      file_size: "77745",
      tags: [],
      filename: "contact-page.png",
      url: "https://eu-images.contentstack.com/v3/assets/bltaa8aa87355a3e5ee/blte4e9b8b888edacf4/6242e2df906f01655b79992a/contact-page.png",
      ACL: [],
      is_dir: false,
      parent_uid: "blt2d1ab05e89374ecc",
      _version: 1,
      title: "contact-page.png",
      dimension: {
        height: 842,
        width: 1920,
      },
      publish_details: [
        {
          environment: "blt0680c7a708ba5b1e",
          locale: "en-us",
          time: "2022-03-30T06:45:23.262Z",
          user: "blt89b5b90cb9e7c645",
          version: 1,
        },
        {
          environment: "bltdf63ecb55e00e84a",
          locale: "en-us",
          time: "2023-05-10T06:15:55.558Z",
          user: "bltcbebbeae13ef79dd",
          version: 1,
        },
      ],
    },
    {
      uid: "blt344484940f86d582",
      created_at: "2022-03-29T10:43:43.508Z",
      updated_at: "2022-03-29T10:43:43.508Z",
      created_by: "blt89b5b90cb9e7c645",
      updated_by: "blt89b5b90cb9e7c645",
      content_type: "image/png",
      file_size: "117467",
      tags: [],
      filename: "homepage.png",
      url: "https://eu-images.contentstack.com/v3/assets/bltaa8aa87355a3e5ee/blt344484940f86d582/6242e2df8bc4d80a901d3717/homepage.png",
      ACL: [],
      is_dir: false,
      parent_uid: "blt2d1ab05e89374ecc",
      _version: 1,
      title: "homepage.png",
      dimension: {
        height: 915,
        width: 1920,
      },
      publish_details: [
        {
          environment: "blt0680c7a708ba5b1e",
          locale: "en-us",
          time: "2022-03-30T06:45:23.186Z",
          user: "blt89b5b90cb9e7c645",
          version: 1,
        },
        {
          environment: "bltdf63ecb55e00e84a",
          locale: "en-us",
          time: "2023-05-10T06:15:55.593Z",
          user: "bltcbebbeae13ef79dd",
          version: 1,
        },
      ],
    },
    {
      uid: "bltb152956626aaf18b",
      created_at: "2022-03-29T10:43:44.366Z",
      updated_at: "2022-03-29T10:43:44.366Z",
      created_by: "blt89b5b90cb9e7c645",
      updated_by: "blt89b5b90cb9e7c645",
      content_type: "image/png",
      file_size: "204254",
      tags: [],
      filename: "blogs.png",
      url: "https://eu-images.contentstack.com/v3/assets/bltaa8aa87355a3e5ee/bltb152956626aaf18b/6242e2e00aa66d1225aaf94a/blogs.png",
      ACL: [],
      is_dir: false,
      parent_uid: "blt2d1ab05e89374ecc",
      _version: 1,
      title: "blogs.png",
      dimension: {
        height: 915,
        width: 1920,
      },
      publish_details: [
        {
          environment: "blt0680c7a708ba5b1e",
          locale: "en-us",
          time: "2022-03-30T06:45:23.248Z",
          user: "blt89b5b90cb9e7c645",
          version: 1,
        },
        {
          environment: "bltdf63ecb55e00e84a",
          locale: "en-us",
          time: "2023-05-10T06:15:55.612Z",
          user: "bltcbebbeae13ef79dd",
          version: 1,
        },
      ],
    },
    {
      uid: "blt9d16f1f08d92b54f",
      created_at: "2022-03-29T10:43:44.489Z",
      updated_at: "2022-03-29T10:43:44.489Z",
      created_by: "blt89b5b90cb9e7c645",
      updated_by: "blt89b5b90cb9e7c645",
      content_type: "image/png",
      file_size: "133958",
      tags: [],
      filename: "about-us.png",
      url: "https://eu-images.contentstack.com/v3/assets/bltaa8aa87355a3e5ee/blt9d16f1f08d92b54f/6242e2e00afd841f76d2ee05/about-us.png",
      ACL: [],
      is_dir: false,
      parent_uid: "blt2d1ab05e89374ecc",
      _version: 1,
      title: "about-us.png",
      dimension: {
        height: 914,
        width: 1895,
      },
      publish_details: [
        {
          environment: "blt0680c7a708ba5b1e",
          locale: "en-us",
          time: "2022-03-30T06:45:23.197Z",
          user: "blt89b5b90cb9e7c645",
          version: 1,
        },
        {
          environment: "bltdf63ecb55e00e84a",
          locale: "en-us",
          time: "2023-05-10T06:15:55.643Z",
          user: "bltcbebbeae13ef79dd",
          version: 1,
        },
      ],
    },
  ],
  coming_soon: false,
  static_links: [
    {
      type: "Source code",
      url: "test1",
      _metadata: {
        uid: "cs79464474b3db8ea6",
      },
    },
    {
      type: "Documentation",
      url: "test2",
      _metadata: {
        uid: "csd66cda53987ed9bf",
      },
    },
    {
      type: "End-User License Agreement",
      url: "test3",
      _metadata: {
        uid: "cs5c45adf3c9a0aa6e",
      },
    },
  ],
  schema: [
    {
      type: "Content Type",
      name: "Header",
      _metadata: {
        uid: "csfaa819dd04ca6436",
      },
      source: {
        uid: "blt2433439404dab6f3",
        created_at: "2023-04-04T05:02:58.489Z",
        updated_at: "2023-04-04T05:02:58.489Z",
        created_by: "bltd5e1f9e7bbbf5fff",
        updated_by: "bltd5e1f9e7bbbf5fff",
        content_type: "application/json",
        file_size: "2203",
        tags: [],
        filename: "header.json",
        url: "https://eu-assets.contentstack.com/v3/assets/bltaa8aa87355a3e5ee/blt2433439404dab6f3/642baf820b84494288f69956/header.json",
        ACL: [],
        is_dir: false,
        parent_uid: "blt57f714c35632e227",
        _version: 1,
        title: "header.json",
        publish_details: [
          {
            environment: "blt0680c7a708ba5b1e",
            locale: "en-us",
            time: "2023-04-04T09:55:38.328Z",
            user: "bltd5e1f9e7bbbf5fff",
            version: 1,
          },
          {
            environment: "bltdf63ecb55e00e84a",
            locale: "en-us",
            time: "2023-05-10T06:15:55.386Z",
            user: "bltcbebbeae13ef79dd",
            version: 1,
          },
        ],
      },
    },
    {
      type: "Content Type",
      name: "Footer",
      _metadata: {
        uid: "cs3b03f67f44a06756",
      },
      source: {
        uid: "bltb35b9da04d40e66e",
        created_at: "2023-04-04T05:02:58.061Z",
        updated_at: "2023-04-04T05:02:58.061Z",
        created_by: "bltd5e1f9e7bbbf5fff",
        updated_by: "bltd5e1f9e7bbbf5fff",
        content_type: "application/json",
        file_size: "2235",
        tags: [],
        filename: "footer.json",
        url: "https://eu-assets.contentstack.com/v3/assets/bltaa8aa87355a3e5ee/bltb35b9da04d40e66e/642baf82d3445310e1214f58/footer.json",
        ACL: [],
        is_dir: false,
        parent_uid: "blt57f714c35632e227",
        _version: 1,
        title: "footer.json",
        publish_details: [
          {
            environment: "blt0680c7a708ba5b1e",
            locale: "en-us",
            time: "2023-04-04T09:55:38.443Z",
            user: "bltd5e1f9e7bbbf5fff",
            version: 1,
          },
          {
            environment: "bltdf63ecb55e00e84a",
            locale: "en-us",
            time: "2023-05-10T06:15:55.421Z",
            user: "bltcbebbeae13ef79dd",
            version: 1,
          },
        ],
      },
    },
    {
      type: "Content Type",
      name: "Page",
      _metadata: {
        uid: "cs3ede70181e157798",
      },
      source: {
        uid: "blt9d9d796c83613f18",
        created_at: "2023-04-04T05:02:58.418Z",
        updated_at: "2023-04-04T05:02:58.418Z",
        created_by: "bltd5e1f9e7bbbf5fff",
        updated_by: "bltd5e1f9e7bbbf5fff",
        content_type: "application/json",
        file_size: "13473",
        tags: [],
        filename: "page.json",
        url: "https://eu-assets.contentstack.com/v3/assets/bltaa8aa87355a3e5ee/blt9d9d796c83613f18/642baf8285ce2c10ece9ac0c/page.json",
        ACL: [],
        is_dir: false,
        parent_uid: "blt57f714c35632e227",
        _version: 1,
        title: "page.json",
        publish_details: [
          {
            environment: "blt0680c7a708ba5b1e",
            locale: "en-us",
            time: "2023-04-04T09:55:38.426Z",
            user: "bltd5e1f9e7bbbf5fff",
            version: 1,
          },
          {
            environment: "bltdf63ecb55e00e84a",
            locale: "en-us",
            time: "2023-05-10T06:15:55.445Z",
            user: "bltcbebbeae13ef79dd",
            version: 1,
          },
        ],
      },
    },
    {
      type: "Content Type",
      name: "Blog Entry",
      _metadata: {
        uid: "cs52b00cf0889ec6bd",
      },
      source: {
        uid: "bltbd0abc7fc71343bb",
        created_at: "2023-04-04T05:02:58.398Z",
        updated_at: "2023-04-04T05:02:58.398Z",
        created_by: "bltd5e1f9e7bbbf5fff",
        updated_by: "bltd5e1f9e7bbbf5fff",
        content_type: "application/json",
        file_size: "3616",
        tags: [],
        filename: "blog_post.json",
        url: "https://eu-assets.contentstack.com/v3/assets/bltaa8aa87355a3e5ee/bltbd0abc7fc71343bb/642baf828bc5e102720a3780/blog_post.json",
        ACL: [],
        is_dir: false,
        parent_uid: "blt57f714c35632e227",
        _version: 1,
        title: "blog_post.json",
        publish_details: [
          {
            environment: "blt0680c7a708ba5b1e",
            locale: "en-us",
            time: "2023-04-04T09:55:38.397Z",
            user: "bltd5e1f9e7bbbf5fff",
            version: 1,
          },
          {
            environment: "bltdf63ecb55e00e84a",
            locale: "en-us",
            time: "2023-05-10T06:15:55.460Z",
            user: "bltcbebbeae13ef79dd",
            version: 1,
          },
        ],
      },
    },
    {
      type: "Content Type",
      name: "Author",
      _metadata: {
        uid: "cs1185067ad1effcd0",
      },
      source: {
        uid: "blt30788c88268c6028",
        created_at: "2023-04-04T05:02:58.058Z",
        updated_at: "2023-04-04T05:02:58.058Z",
        created_by: "bltd5e1f9e7bbbf5fff",
        updated_by: "bltd5e1f9e7bbbf5fff",
        content_type: "application/json",
        file_size: "889",
        tags: [],
        filename: "author.json",
        url: "https://eu-assets.contentstack.com/v3/assets/bltaa8aa87355a3e5ee/blt30788c88268c6028/642baf82c7febf10efad4cf8/author.json",
        ACL: [],
        is_dir: false,
        parent_uid: "blt57f714c35632e227",
        _version: 1,
        title: "author.json",
        publish_details: [
          {
            environment: "blt0680c7a708ba5b1e",
            locale: "en-us",
            time: "2023-04-04T09:55:38.455Z",
            user: "bltd5e1f9e7bbbf5fff",
            version: 1,
          },
          {
            environment: "bltdf63ecb55e00e84a",
            locale: "en-us",
            time: "2023-05-10T06:15:55.645Z",
            user: "bltcbebbeae13ef79dd",
            version: 1,
          },
        ],
      },
    },
    {
      type: "Global Field",
      name: "SEO",
      _metadata: {
        uid: "csde41bcf3cde97ff2",
      },
      source: {
        uid: "blt6f7c7f08dfa8b954",
        created_at: "2023-04-04T09:42:55.824Z",
        updated_at: "2023-04-04T09:42:55.824Z",
        created_by: "bltd5e1f9e7bbbf5fff",
        updated_by: "bltd5e1f9e7bbbf5fff",
        content_type: "application/json",
        file_size: "1103",
        tags: [],
        filename: "seo.json",
        url: "https://eu-assets.contentstack.com/v3/assets/bltaa8aa87355a3e5ee/blt6f7c7f08dfa8b954/642bf11fbce47702737562a0/seo.json",
        ACL: [],
        is_dir: false,
        parent_uid: "bltdebf05616540293b",
        _version: 1,
        title: "seo.json",
        publish_details: [
          {
            environment: "blt0680c7a708ba5b1e",
            locale: "en-us",
            time: "2023-04-04T09:55:38.449Z",
            user: "bltd5e1f9e7bbbf5fff",
            version: 1,
          },
          {
            environment: "bltdf63ecb55e00e84a",
            locale: "en-us",
            time: "2023-05-10T06:15:55.496Z",
            user: "bltcbebbeae13ef79dd",
            version: 1,
          },
        ],
      },
    },
  ],
  tags: [],
  locale: "en-us",
  uid: "blt70465e00fab9f780",
  created_by: "blt78cea3a89ceb6137",
  updated_by: "bltcbebbeae13ef79dd",
  created_at: "2023-04-26T13:39:53.277Z",
  updated_at: "2023-05-10T06:24:06.269Z",
  ACL: {},
  _version: 12,
  _in_progress: false,
  _embedded_items: {
    description: [],
  },
  publish_details: [
    {
      environment: "blt0680c7a708ba5b1e",
      locale: "en-us",
      time: "2023-05-10T06:24:12.701Z",
      user: "bltcbebbeae13ef79dd",
      version: 12,
    },
    {
      environment: "bltdf63ecb55e00e84a",
      locale: "en-us",
      time: "2023-05-10T06:24:12.706Z",
      user: "bltcbebbeae13ef79dd",
      version: 12,
    },
  ],
  _rules: [],
};

const allStacks = [
  {
    name: "Angular Starter ",
    api_key: "blt09f3b5d7a97842e2",
    uid: "blt85eb9c96f346a01b",
  },
  {
    name: "nextjs-launch-test",
    api_key: "bltf112d2eb9954a898",
    uid: "blt2ad122c507d1e4e2",
  },
  {
    name: "NextJs-launch-test66vy",
    api_key: "blt2cc14a920c8e0b1b",
    uid: "blt16e7767493a49524",
  },
  {
    name: "nextvercel test",
    api_key: "bltb35adf6f4806ea22",
    uid: "blt7bc8c4f01ca44ce8",
  },
  {
    name: "nextvercel",
    api_key: "bltf6c51882f0af545b",
    uid: "blt78445239b88d7bec",
  },
  {
    name: "nextjs-706pm",
    api_key: "blt847a03a400de619a",
    uid: "bltf073de1f8ee32c14",
  },
  {
    name: "nextjs",
    api_key: "blt3284c46805ecdf0e",
    uid: "blt11a1b6c11ac5ef5f",
  },
  {
    name: "nexthstest1229",
    api_key: "blt7deeb867a001b8c3",
    uid: "blt05dcc496bcf58edb",
  },
  {
    name: "empty-cm",
    api_key: "blt23ed62f878cb5613",
    uid: "blt870f2a79f1da10dc",
  },
];
const worker = setupWorker(
  rest.post("/content-models/validate", (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        id: "aa3c8784-33ef-44c6-97fb-633fad670dc2",
        status: "Failure",
        message: "Validation complete. Conflicts found.",
        conflicts: [
          {
            type: "contentType",
            field: "title",
            subject: "Author",
            path: "/content_types/author.json",
          },
          {
            type: "contentType",
            field: "title",
            subject: "Blog Entry",
            path: "/content_types/blog_post.json",
          },
          {
            type: "contentType",
            field: "title",
            subject: "Footer",
            path: "/content_types/footer.json",
          },
          {
            type: "contentType",
            field: "title",
            subject: "Header",
            path: "/content_types/header.json",
          },
          {
            type: "contentType",
            field: "title",
            subject: "Page",
            path: "/content_types/page.json",
          },
          {
            type: "extension",
            field: "title",
            subject: "Color Picker",
            path: "/extensions/extensions.json",
          },
          {
            type: "extension",
            field: "title",
            subject: "JSON Editor",
            path: "/extensions/extensions.json",
          },
          {
            type: "extension",
            field: "title",
            subject: "Ace Editor",
            path: "/extensions/extensions.json",
          },
          {
            type: "globalField",
            field: "title",
            subject: "SEO",
            path: "/global_fields/globalfields.json",
          },
          {
            type: "label",
            field: "title",
            subject: "Components",
            path: "/labels/labels.json",
          },
          {
            type: "label",
            field: "title",
            subject: "Blog",
            path: "/labels/labels.json",
          },
          {
            type: "label",
            field: "title",
            subject: "Pages",
            path: "/labels/labels.json",
          },
        ],
        allData: [
          {
            type: "contentType",
            uid: "page",
            title: "Page",
          },
          {
            type: "contentType",
            uid: "header",
            title: "Header",
          },
          {
            type: "contentType",
            uid: "footer",
            title: "Footer",
          },
          {
            type: "contentType",
            uid: "blog_post",
            title: "Blog Entry",
          },
          {
            type: "contentType",
            uid: "author",
            title: "Author",
          },
          {
            type: "globalField",
            uid: "seo",
            title: "SEO",
          },
          {
            type: "label",
            uid: "blt206146dd71e7ba99",
            title: "Blog",
          },
          {
            type: "label",
            uid: "blt54e2b712f237fae2",
            title: "Pages",
          },
          {
            type: "label",
            uid: "blt54a92ab1e495e7d6",
            title: "Components",
          },
          {
            type: "extension",
            uid: "bltf1faae895aacaedb",
            title: "JSON Editor",
          },
          {
            type: "extension",
            uid: "blta1fc5f238c2c4985",
            title: "Ace Editor",
          },
          {
            type: "extension",
            uid: "blt28b8410b4b4296e3",
            title: "Color Picker",
          },
        ],
      })
    );
  }),

  rest.post("/content-models/validate/success", (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        status: "Success",
        message: "Validation complete. No conflicts found.",
      })
    );
  }),

  rest.post("/content-models/validate/error", (req, res, ctx) => {
    return res(ctx.status(401), ctx.json({ error: "You are unauthorized to make this request." }));
  }),

  rest.post("/content-models/import", (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        status: "Success",
        message: "Content Model(s) imported successfully.",
        environment: "SomeEnv",
        id: "random10digitNumber",
        stackUrl: "https://someUrl",
      })
    );
  }),

  rest.get("http://localhost:3000/stack?state=7a29001f-9da3-46e1-a9cb-6a9e1fbb11c0", (req, res, ctx) => {
    return res(ctx.status(201), ctx.json(allStacks));
  }),

  rest.post("/content-models/import/failed", (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        status: "Failure",
        message: "Import failed due to conflicts",
        conflicts: [
          {
            type: "contentType",
            field: "title",
            subject: "Page -changed",
            path: "/content-types/page.json",
          },
          {
            type: "contentType",
            field: "uid",
            subject: "page",
            path: "/content-types/page.json",
          },
          {
            type: "extension",
            field: "title",
            subject: "Color Picker -changed",
            path: "/extensions/extensions.json",
          },
          {
            type: "globalfield",
            field: "uid",
            subject: "seo",
            path: "/global_fields/globalfields.json",
          },
          {
            type: "label",
            field: "title",
            subject: "Components-changed",
            path: "/labels/labels.json",
          },
        ],

        allData: [
          {
            type: "contentType",
            title: "Page",
            uid: "page",
          },
          {
            type: "extension",
            title: "Color Picker",
            uid: "blt177a247959c3c6ff",
          },
          {
            type: "globalfield",
            title: "SEO",
            uid: "seo",
          },
          {
            type: "label",
            title: "Components",
            uid: "bltd2de964ceb89fc1b",
          },
        ],
      })
    );
  }),

  rest.post("/content-models/import/error", (req, res, ctx) => {
    return res(ctx.status(401), ctx.json({ error: "You are unauthorized to make this request." }));
  })
);

worker.start();

const correctionsArray = [
  {
    type: "contentType",
    field: "title",
    subject: {
      old: "Author",
      new: "Author2",
    },
    path: "/content_types/author.json",
    operation: "rename",
  },
  {
    type: "contentType",
    field: "title",
    subject: {
      old: "Blog Entry",
      new: "Bloob",
    },
    path: "/content_types/blog_post.json",
    operation: "rename",
  },
  {
    type: "contentType",
    field: "uid",
    subject: {
      old: "footer",
      new: "footer",
    },
    path: "/content_types/footer.json",
    operation: "replace",
  },
  {
    type: "contentType",
    field: "uid",
    subject: {
      old: "header",
      new: "footer",
    },
    path: "/content_types/header.json",
    operation: "replace",
  },
  {
    type: "contentType",
    field: "title",
    subject: {
      old: "Page",
      new: "SomeNew",
    },
    path: "/content_types/page.json",
    operation: "rename",
  },
  {
    type: "extension",
    field: "title",
    subject: {
      old: "Color Picker",
      new: "JSON Editor",
    },
    path: "/extensions/extensions.json",
    operation: "replace",
  },
  {
    type: "extension",
    field: "title",
    subject: {
      old: "JSON Editor",
      new: "Ace Editor",
    },
    path: "/extensions/extensions.json",
    operation: "replace",
  },
  {
    type: "extension",
    field: "title",
    subject: {
      old: "Ace Editor",
      new: "Ace Editor",
    },
    path: "/extensions/extensions.json",
    operation: "replace",
  },
  {
    type: "globalField",
    field: "uid",
    subject: {
      old: "seo",
      new: "seo",
    },
    path: "/global_fields/globalfields.json",
    operation: "replace",
  },
  {
    type: "label",
    field: "title",
    subject: {
      old: "Components",
      new: "Blog",
    },
    path: "/labels/labels.json",
    operation: "replace",
  },
  {
    type: "label",
    field: "title",
    subject: {
      old: "Blog",
      new: "Pages",
    },
    path: "/labels/labels.json",
    operation: "replace",
  },
  {
    type: "label",
    field: "title",
    subject: {
      old: "Pages",
      new: "Components",
    },
    path: "/labels/labels.json",
    operation: "replace",
  },
];
