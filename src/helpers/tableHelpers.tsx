import React from "react";

const renderData = <T,>(
  dataLines: T[],
  makeRows: (dataLines: T[]) => React.JSX.Element,
  noResultsText: string,
): React.JSX.Element => {
  if (dataLines.length > 0) {
    return <>{makeRows(dataLines)}</>;
  } else {
    return (
      <tr>
        <td colSpan={8}>
          <h6 className="text-center">{noResultsText}</h6>
        </td>
      </tr>
    );
  }
};

export { renderData };
