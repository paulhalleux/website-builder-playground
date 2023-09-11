import { Website } from "@playground/common";

export const editorValue: Website = {
  name: "My Website",
  content: [
    {
      id: "main-layout",
      name: "Main Layout",
      title: "Website - %s",
      path: "/",
      layers: [
        {
          type: "header",
          name: "Header",
          id: "header",
          order: 1,
          children: [],
          properties: {},
        },
        {
          type: "primitive:container",
          name: "Container",
          id: "container",
          order: 2,
          properties: {},
          children: [
            {
              type: "main",
              name: "Content",
              id: "content",
              order: 1,
              children: [],
              properties: {},
            },
          ],
        },
        {
          type: "footer",
          name: "Footer",
          id: "footer",
          order: 3,
          children: [],
          properties: {},
        },
      ],
      children: [
        {
          id: "p1",
          name: "Page 1",
          title: "Page 1",
          path: "/",
          layers: [],
          children: [],
        },
      ],
    },
    {
      id: "authentication-layout",
      name: "Authentication Layout",
      title: "Website - %s",
      path: "/authentication",
      layers: [],
      children: [
        {
          id: "register",
          name: "Register",
          path: "/register",
          title: "Register",
          layers: [],
          children: [],
        },
        {
          id: "login",
          name: "Login",
          path: "/login",
          title: "Login",
          layers: [],
          children: [],
        },
        {
          id: "forgot-password",
          name: "Forgot Password",
          path: "/forgot-password",
          title: "Forgot Password",
          layers: [],
          children: [],
        },
      ],
    },
    {
      id: "second-page",
      name: "Page 2",
      path: "/page-2",
      title: "Page 2",
      layers: [],
      children: [],
    },
  ],
};
