import React from 'react';
import { merge, get } from 'lodash';
import styled from 'styled-components';
import { useStore } from '@kubed/stook';
import { Form, FormItem, Input, Select, FormInstance } from '@kubed/components';
import { cookie } from '@ks-console/shared';
import { useUpdate } from '../../../../stores/user';

interface WrapperProps {
  $visible: boolean;
}

const BasicInfoWrapper = styled('div')<WrapperProps>`
  display: ${({ $visible }) => ($visible ? 'flex' : 'none')};
  flex-direction: column;
`;

interface BasicInfoProps {
  visible: boolean;
  formData: any;
  form: FormInstance;
}

const BasicInfo = ({ visible, formData, form }: BasicInfoProps) => {
  const [, setBasicInfoChanged] = useStore('BasicInfoChanged');
  const { mutate } = useUpdate({ name: globals.user.username }, (data: any) => {
    const lang = get(data, 'spec.lang');
    if (lang && data.lang !== cookie('lang')) {
      window.location.reload();
    }
  });

  const onFinish = (data: any) => {
    mutate(merge(formData, data));
  };

  const onChange = () => {
    setBasicInfoChanged(true);
  };

  return (
    <BasicInfoWrapper $visible={visible}>
      <div className="form-title">{t('PASSWORD_SETTINGS')}</div>
      <Form
        className="setting-form"
        form={form}
        initialValues={formData}
        onFinish={onFinish}
        onFieldsChange={onChange}
        key={formData?.metadata?.name}
      >
        <FormItem label={t('USERNAME')} name={['metadata', 'name']}>
          <Input placeholder="user@example.com" disabled />
        </FormItem>
        <FormItem label={t('EMAIL')} name={['spec', 'email']} help={t('USER_SETTING_EMAIL_DESC')}>
          <Input placeholder="user@example.com" />
        </FormItem>
        {globals.config.supportLangs && (
          <FormItem label={t('LANGUAGE')} name={['spec', 'lang']}>
            <Select options={globals.config.supportLangs} />
          </FormItem>
        )}
      </Form>
    </BasicInfoWrapper>
  );
};

export default BasicInfo;
