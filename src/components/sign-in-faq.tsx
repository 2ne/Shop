import React from "react";
import { Modal, Collapse, Typography } from "antd";

const { Panel } = Collapse;
const { Paragraph } = Typography;

interface SignInFAQModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignInFAQModal: React.FC<SignInFAQModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      title="Trouble signing in?"
      visible={isOpen}
      onOk={onClose}
      onCancel={onClose}
      footer={null}
      className="w-full max-w-xl"
    >
      <Collapse size="small" className="mb-1">
        <Panel
          header="How do I know if I have an existing JoinIn account?"
          key="1"
        >
          <Paragraph>
            If you've received an email from an organisation using JoinIn,
            you'll have a JoinIn account already. The email address that was
            contacted will be used for logging in. If you try to create an
            account again using the same email address, you will get an error
            telling you there is an account with that email address already and
            requesting that you login.
          </Paragraph>
        </Panel>
        <Panel
          header="My email or password is not being recognised, what do I do?"
          key="2"
        >
          <Paragraph>
            If you attempt to log in and you get the error “Login failed,
            Incorrect credentials” it means that either your email or password
            has not been recognised.
          </Paragraph>
          <Paragraph>
            If you know you have an account with this email, try a different
            password.
          </Paragraph>
          <Paragraph>
            Selecting Reset password and entering your email address will send a
            link to that email, where you can set a new password.
          </Paragraph>
          <Paragraph>
            If your email address was entered correctly and the email is not in
            your junk or spam folders, it may be because you do not have an
            account with that email address. To confirm that this email address
            is the one your account was created with, you can try to search for
            an old email from LoveAdmin. If you cannot find any contact from
            LoveAdmin to any email address you own, please contact the
            organisation directly to see if you are on their system.
          </Paragraph>
        </Panel>
        <Panel header="How do I create a JoinIn account?" key="3">
          <Paragraph>
            When you checkout a product from an organisation's shop page, you
            will be prompted to sign in or create an account. To create an
            account, select “Create account”. A form collecting basic account
            information will then appear.
          </Paragraph>
          <Paragraph>
            If you are purchasing a product on behalf of someone else, please
            note that the “Create account” form must be filled out with your
            details and not those of the child or dependant. As you continue
            with the checkout process after signing in, you will then be
            prompted to add the child or dependant's details.
          </Paragraph>
        </Panel>
        <Panel header="How do I reset my password?" key="4">
          <Paragraph>
            If you cannot remember your password and would like to reset it,
            click “Reset password” on the login screen and follow the
            instructions that arrive in the subsequent email.
          </Paragraph>
        </Panel>
        <Panel
          header="Why am I not receiving an email when trying to reset my password?"
          key="5"
        >
          <Paragraph>
            If your email address was entered correctly and the email is not in
            your junk or spam folders, it may be because you do not have an
            account with that email address. To confirm that this email address
            is the one your account was created with, you can try to search for
            an old email from LoveAdmin. If you cannot find any contact from
            LoveAdmin to any email address you own, please contact the
            organisation directly to see if you are on their system.
          </Paragraph>
        </Panel>
      </Collapse>
    </Modal>
  );
};

export default SignInFAQModal;
