import { createLocalVue } from "@vue/test-utils";
import Breadcrumbs from "./Breadcrumbs";
import VueRouter from "vue-router";

const localVue = createLocalVue();
localVue.use(VueRouter);

describe("Breadcrumbs", () => {
  // Inspect the raw component options
  it("Should be created", () => {
    expect(Breadcrumbs).toBeDefined();
    expect(Breadcrumbs.name).toEqual("breadcrumbsComponent");
  });
});
