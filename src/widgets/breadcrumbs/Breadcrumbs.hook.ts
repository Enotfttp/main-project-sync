import { useLocation, Link } from 'react-router-dom';
import { BreadcrumbsProps } from '@admiral-ds/react-ui';
import { routesPath } from '@app/providers';

type BreadcrumbItem = BreadcrumbsProps['items'][number];

export const useBreadcrumbs = (): BreadcrumbItem[] => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const location = useLocation();
  const pathParts = location.pathname.split('/').filter(Boolean);

  const items: BreadcrumbItem[] = [];

  let currentNode = routesPath;
  let fullPath = '';
  let currentPathIndex = 0;

  while (currentPathIndex < pathParts.length) {
    const part = pathParts[currentPathIndex];
    // Находим совпадающий узел среди потомков текущего
    const matchingKey = Object.keys(currentNode).find((key) => {
      const child = currentNode[key];
      if (typeof child !== 'object' || !child.root) return false;

      const childSegments = child.root.split('/').filter(Boolean);
      let expectedSegment = childSegments[childSegments.length - 1];
      if(expectedSegment.includes(':')){
        expectedSegment = childSegments[childSegments.length - 2];
      }

      return (
        expectedSegment === part || expectedSegment?.startsWith(':') // динамический сегмент
      );
    });

    if (!matchingKey) break;

    const nextNode = currentNode[matchingKey];
    currentNode = nextNode;

    const segments = nextNode.root.split('/').filter(Boolean);

    for (let i = 0; i < segments.length && currentPathIndex < pathParts.length; i++) {
      const value = pathParts[currentPathIndex];

      fullPath += `/${value}`;
      currentPathIndex++;
    }

    if (nextNode.label) {
      items.push({
        text: nextNode.label,
        linkAs: Link,
        linkProps: { to: fullPath },
      });
    }
  }

  return items;
};
