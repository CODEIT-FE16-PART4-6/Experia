'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ComponentType, SVGProps } from 'react';

interface SnbList {
  icon?: ComponentType<SVGProps<SVGElement>>;
  path: string;
  label: string;
}

interface SnbListProps {
  item: SnbList;
}

const SnbList = ({ item }: SnbListProps) => {
  const pathname = usePathname();
  const { path, icon: Icon, label } = item;

  return (
    <li className='group hover:text-primary'>
      <Link
        href={path}
        className={clsx('group-hover:bg-green-light mt-2 flex gap-2 rounded-xl p-2', {
          'bg-green-light': pathname === path,
        })}
      >
        {/* {Icon && (
          <Icon
            width={24}
            height={24}
            className={clsx('group-hover:text-primary', {
              'text-primary': pathname === path,
            })}
          />
        )} */}

        <span className={pathname === path ? 'text-primary' : ''}>{label}</span>
      </Link>
    </li>
  );
};

export default SnbList;
