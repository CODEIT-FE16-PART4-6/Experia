'use client';

import DropdownSelect from '@/components/DropdownSelect';
import InputField from '@/components/InputField';
import { ACTIVITY_CATEGORIES } from '@/constants';

const AddActivityForm = () => {
  return (
    <form>
      <InputField placeholder='제목' />
      <DropdownSelect items={ACTIVITY_CATEGORIES} />
    </form>
  );
};

export default AddActivityForm;
