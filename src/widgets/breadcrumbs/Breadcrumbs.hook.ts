import { useLocation, Link } from 'react-router-dom';
import { BreadcrumbsProps } from '@admiral-ds/react-ui';
import { routesPath } from '@app/providers';

type BreadcrumbItem = BreadcrumbsProps['items'][number];

export const useBreadcrumbs = (): BreadcrumbItem[] => {
  const location = useLocation();
  const pathParts = location.pathname.split('/').filter(Boolean);

  const items: BreadcrumbItem[] = [];

  let currentNode = routesPath;
  let fullPath = '';
  let currentPathIndex = 0;

  if (routesPath.label && routesPath.root === '/') {
    items.push({
      text: routesPath.label,
      linkAs: Link,
      linkProps: { to: '/' },
    });
  }

  while (currentPathIndex < pathParts.length) {
    const part = pathParts[currentPathIndex];
    // Находим совпадающий узел среди потомков текущего
    const matchingKey = Object.keys(currentNode).find((key) => {
      const child = currentNode[key];
      if (typeof child !== 'object' || !child.root) return false;

      const childSegments = child.root.split('/').filter(Boolean);
      const expectedSegment = childSegments[childSegments.length - 2];

      return (
        expectedSegment === part || expectedSegment?.startsWith(':') // динамический сегмент
      );
    });

    if (!matchingKey) break;

    const nextNode = currentNode[matchingKey];
    currentNode = nextNode;

    const segments = nextNode.root.split('/').filter(Boolean);
    const dynamicParams: string[] = [];

    for (let i = 0; i < segments.length && currentPathIndex < pathParts.length; i++) {
      const segment = segments[i];
      const value = pathParts[currentPathIndex];

      if (segment.startsWith(':')) {
        dynamicParams.push(value);
      } else if (segment === value) {
        // ok
      } else {
        // path mismatch
        break;
      }

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
