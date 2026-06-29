import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Dashboard } from "./components/Dashboard";
import { PlaceholderPage } from "./components/PlaceholderPage";
import { PlanList } from "./components/PlanList";
import { PlanForm } from "./components/PlanForm";
import { DraftList } from "./components/DraftList";
import { DraftForm } from "./components/DraftForm";
import { DraftDetail } from "./components/DraftDetail";
import { ReviewList } from "./components/ReviewList";
import { ReviewForm } from "./components/ReviewForm";
import { ReviewDetail } from "./components/ReviewDetail";
import { PublishList } from "./components/PublishList";
import { PublishForm } from "./components/PublishForm";
import { PublishDetail } from "./components/PublishDetail";
import { ChangeList } from "./components/ChangeList";
import { ChangeForm } from "./components/ChangeForm";
import { ChangeDetail } from "./components/ChangeDetail";
import { AbolishList } from "./components/AbolishList";
import { AbolishForm } from "./components/AbolishForm";
import { AbolishDetail } from "./components/AbolishDetail";
import { ImportList } from "./components/ImportList";
import { ImportForm } from "./components/ImportForm";
import { ImportDetail } from "./components/ImportDetail";
import { ReReviewList } from "./components/ReReviewList";
import { ReReviewForm } from "./components/ReReviewForm";
import { ReReviewDetail } from "./components/ReReviewDetail";
import { DocsLibrary } from "./components/DocsLibrary";
import { ProcessesLibrary } from "./components/ProcessesLibrary";
import { CommonLibrary } from "./components/CommonLibrary";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "plan", Component: PlanList },
      { path: "plan/new", Component: PlanForm },
      { path: "draft", Component: DraftList },
      { path: "draft/new", Component: DraftForm },
      { path: "draft/:id", Component: DraftDetail },
      { path: "draft/:id/edit", Component: DraftForm },
      { path: "review", Component: ReviewList },
      { path: "review/new", Component: ReviewForm },
      { path: "review/:id", Component: ReviewDetail },
      { path: "review/:id/edit", Component: ReviewForm },
      { path: "publish", Component: PublishList },
      { path: "publish/new", Component: PublishForm },
      { path: "publish/:id", Component: PublishDetail },
      { path: "publish/:id/edit", Component: PublishForm },
      { path: "change", Component: ChangeList },
      { path: "change/new", Component: ChangeForm },
      { path: "change/:id", Component: ChangeDetail },
      { path: "change/:id/edit", Component: ChangeForm },
      { path: "abolish", Component: AbolishList },
      { path: "abolish/new", Component: AbolishForm },
      { path: "abolish/:id", Component: AbolishDetail },
      { path: "abolish/:id/edit", Component: AbolishForm },
      { path: "import", Component: ImportList },
      { path: "import/new", Component: ImportForm },
      { path: "import/:id", Component: ImportDetail },
      { path: "import/:id/edit", Component: ImportForm },
      { path: "re-review", Component: ReReviewList },
      { path: "re-review/new", Component: ReReviewForm },
      { path: "re-review/:id", Component: ReReviewDetail },
      { path: "re-review/:id/edit", Component: ReReviewForm },
      { path: "docs", Component: DocsLibrary },
      { path: "processes", Component: ProcessesLibrary },
      { path: "common", Component: CommonLibrary },
      { path: "help", Component: () => <PlaceholderPage title="帮助中心" /> },
      { path: "*", Component: () => <PlaceholderPage title="页面未找到" /> },
    ],
  },
]);
