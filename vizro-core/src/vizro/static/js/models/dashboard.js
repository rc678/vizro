export function _update_dashboard_theme(theme_selector_checked) {
  document.documentElement.setAttribute(
    "data-bs-theme",
    theme_selector_checked ? "light" : "dark",
  );
  return theme_selector_checked ? "vizro_light" : "vizro_dark";
}

export function _update_ag_grid_theme(theme_selector_checked) {
  return theme_selector_checked
    ? "ag-theme-quartz ag-theme-vizro"
    : "ag-theme-quartz-dark ag-theme-vizro";
}

export function _update_graph_theme(
  figure,
  theme_selector_checked,
  vizro_themes,
) {
  const theme_to_apply = theme_selector_checked ? "vizro_light" : "vizro_dark";

  const updated_figure = {
    ...figure,
    layout: {
      ...figure.layout,
      template: vizro_themes[theme_to_apply],
    },
  };

  return [updated_figure, {}];
  // {} resets the figure.style to undo the {"visibility": "hidden"} from set_props in Graph.__call__.
}

export function _collapse_nav_panel(n_clicks, is_open) {
  if (!n_clicks) {
    /* Automatically collapses left-side if xs and s-devices are detected*/
    if (window.innerWidth < 576 || window.innerHeight < 576) {
      return [
        false,
        {
          transform: "rotate(180deg)",
          transition: "transform 0.35s ease-in-out",
        },
        "Show Menu",
      ];
    }
    return dash_clientside.no_update;
  }
  if (is_open) {
    return [
      false,
      {
        transform: "rotate(180deg)",
        transition: "transform 0.35s ease-in-out",
      },
      "Show Menu",
    ];
  } else {
    return [
      true,
      {
        transform: "rotate(0deg)",
        transition: "transform 0.35s ease-in-out",
      },
      "Hide Menu",
    ];
  }
}
