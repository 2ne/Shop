import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Button, Form, Modal } from "antd";
import FormHeader from "../form-header";
import { useBasketContext } from "../basket/basket-context";
import { Participant } from "../../types/types";

export interface CheckoutAdditionalFormsHandles {
  submitForm: () => Promise<boolean>;
}

interface CheckoutAdditionalFormsProps {
  title: string;
  subtitle: string;
  onFormValidation: (isValid: boolean) => void;
}

const CheckoutAdditionalForms = forwardRef<
  CheckoutAdditionalFormsHandles,
  CheckoutAdditionalFormsProps
>(
  (
    { onFormValidation, title, subtitle }: CheckoutAdditionalFormsProps,
    ref: React.Ref<CheckoutAdditionalFormsHandles>
  ) => {
    const { basketItems } = useBasketContext();
    const [additionalInfoForm] = Form.useForm();
    const [formModal, setFormModal] = useState(false);

    const showFormModal = () => {
      setFormModal(true);
    };

    const formModalCancel = () => {
      setFormModal(false);
    };

    // Create a Set to store unique participant IDs
    const participantIds = new Set<number>();

    // Generate a unique participant list by filtering basket items' participants based on their unique IDs
    const participants = basketItems
      .flatMap((item) => {
        // Get participants from item or use empty array if none
        return item.participants ?? [];
      })
      .filter((participant) => {
        // Keep participant in array if ID is not already in Set, then add ID to Set
        if (!participantIds.has(participant.id)) {
          participantIds.add(participant.id);
          return true;
        }
        // Exclude participant if ID already in Set
        return false;
      });

    useImperativeHandle(ref, () => ({
      // The 'submitForm' function is exposed to the parent component (checkout) via the ref so it can be called externally to trigger form validation and submission
      submitForm: async () => {
        try {
          // Validate all form fields
          await additionalInfoForm.validateFields();
          // If validation is successful, submit the form
          additionalInfoForm.submit();
          // Notify the parent component that the form is valid
          onFormValidation(true);
          // Return true to indicate that the form submission was successful
          return true;
        } catch (error) {
          // Log the validation error
          console.log("Validation failed:", error);
          // Notify the parent component that the form is not valid
          onFormValidation(false);
          // Return false to indicate that the form submission failed
          return false;
        }
      },
    }));

    // This function is called when the form is submitted
    const onDetailsFinish = (
      values: { [key: string]: any },
      participants: Participant[]
    ) => {
      console.log("TO DO:", basketItems);
    };

    const onDetailsFinishFailed = (errorInfo: any) => {
      console.log(errorInfo);
    };

    return (
      <>
        <FormHeader
          title={title}
          subtitle={subtitle}
          icon={
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <circle
                cx="12"
                cy="8"
                r="3.25"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              ></circle>
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M12.25 19.25h-5.3c-1.18 0-2.06-1.04-1.46-2.055C6.363 15.723 8.24 14 12.25 14M14.75 17.75l1.25 1.5 3.25-4.5"
              ></path>
            </svg>
          }
        />
        <Form
          layout="vertical"
          form={additionalInfoForm}
          name="additionalInfoForm"
          onFinish={(values) => onDetailsFinish(values, participants)}
          onFinishFailed={onDetailsFinishFailed}
          className="space-y-6 text-left hide-validation-asterix"
          requiredMark="optional"
        >
          {participants.map((participant, index) => (
            <div
              key={`participant_${index}`}
              className="p-4 border rounded-md border-neutral-200 [&:has(.ant-form-item-has-error)]:border-error"
            >
              <div className="pb-4 mb-4 font-medium border-b">
                {participant.firstName} {participant.lastName}
              </div>
              <div className="space-y-5">
                <div>
                  <div className="mb-1 font-medium">
                    British swimming questions
                  </div>
                  <Button
                    type="primary"
                    block
                    className="!bg-success hover:!bg-success/90 gap-0.5"
                    onClick={showFormModal}
                  >
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M4.75 12A7.25 7.25 0 0112 4.75v0A7.25 7.25 0 0119.25 12v0A7.25 7.25 0 0112 19.25v0A7.25 7.25 0 014.75 12v0z"
                      ></path>
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M9.75 12.75l.434.924a1 1 0 001.772.073L14.25 9.75"
                      ></path>
                    </svg>
                    <span>View form</span>
                  </Button>
                </div>
                <div>
                  <div className="mb-1 font-medium">
                    Previous coach experience
                  </div>
                  <Button block onClick={showFormModal}>
                    <span>Add information</span>
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M10.75 8.75L14.25 12L10.75 15.25"
                      ></path>
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </Form>
        <Modal
          title="Terms and Conditions"
          open={formModal}
          onCancel={formModalCancel}
          footer={null}
        >
          <div
            className="prose"
            dangerouslySetInnerHTML={{
              __html: `
<h2 style="text-align: center;">Welcome to the TinyMCE Cloud demo!</h2>
<h5 style="text-align: center;">This demo includes <em>enterprise</em>, also known as <em>Premium</em> features.</h5>
<h5 style="text-align: center;">Try out these features as provided in this full featured example.</h5>
<h5 style="text-align: center;">And visit the <a href="../../../../pricing">pricing page</a> to learn more about our Premium plugins.</h5>
<h2>Got questions or need help?</h2>
<ul>
  <li>Our <a class="mceNonEditable" href="../../7/">documentation</a> is a great resource for learning how to configure TinyMCE.</li>
  <li>Have a specific question? Try the <a href="https://stackoverflow.com/questions/tagged/tinymce" target="_blank" rel="noopener"><code>tinymce</code> tag at Stack Overflow</a>.</li>
  <li>We also offer enterprise grade support as part of <a href="../../../../pricing">TinyMCE premium subscriptions</a>.</li>
</ul>
<h2>A simple table to play with</h2>
<table style="border-collapse: collapse; width: 100%;" border="1">
  <thead>
    <tr style="text-align: left;">
      <th>Product</th>
      <th>Cost</th>
      <th>Really?</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>TinyMCE Cloud</td>
      <td>Get started for free</td>
      <td><strong>Yes!</strong></td>
    </tr>
    <tr>
      <td>Plupload</td>
      <td>Free</td>
      <td><strong>Yes!</strong></td>
    </tr>
  </tbody>
</table>
<h2>Character strings to demonstrate some of the Advanced Typography plugin&rsquo;s features</h2>
<p>Select the characters in the list below and choose <strong>Tools &rarr; Typography &rarr; Enhance</strong>.</p>
<ul>
  <li>Not really an arrow glyph: -&gt;</li>
  <li>"Double tear-drop quotation marks and apostrophes aren't typographically elegant."</li>
  <li>But they should be honored in a <code>code-fragment: "true"</code>.</li>
  <li>(c) symbol</li>
  <li>(tm) symbol</li>
  <li>30C is 86F</li>
</ul>
<h2 class="p1"><span class="s1">🤖</span><span class="s2"><strong> Try out AI Assistant!</strong></span></h2>
<p class="p2"><span class="s2">Below are just a few of the ways you can use AI Assistant within your app. Since you can define your own custom prompts, the sky really is the limit!</span></p>
<p class="p2"><span class="s2"><strong>&nbsp;</strong></span><span class="s3">🎭</span><span class="s2"><strong> Changing tone </strong>&ndash;<strong>&nbsp;</strong>Lighten up the sentence below by selecting the text, clicking ,&nbsp;and choosing <em>Change tone &gt; Friendly</em>.</span></p>
<blockquote>
  <p class="p2"><span class="s2">The 3Q23 financial results followed a predictable trend, reflecting the status quo from previous years.</span></p>
</blockquote>
<p class="p2"><span class="s3">📝</span><span class="s2"><strong> Summarizing&nbsp;</strong>&ndash; Below is a long paragraph that people may not want to read from start to finish. Get a quick summary by selecting the text, clicking ,&nbsp;and choosing <em>Summarize content</em>.</span></p>
<blockquote>
  <p class="p2"><span class="s2">Population growth in the 17th century was marked by significant increment in the number of people around the world. Various factors contributed to this demographic trend. Firstly, advancements in agriculture and technology resulted in increased food production and improved living conditions. This led to decreased mortality rates and better overall health, allowing for more individuals to survive and thrive. Additionally, the exploration and expansion of European powers, such as colonization efforts, fostered migration and settlement in new territories.</span></p>
</blockquote>
<p class="p2"><span class="s3">💡</span><span class="s2"><strong> Writing from scratch</strong> &ndash; Ask AI Assistant to generate content from scratch by clicking, and typing&nbsp;<em>Write a marketing email announcing TinyMCE's new AI Assistant plugin</em>.</span></p>
<p class="p2">&nbsp;</p>
<h2>Note on the included Templates demonstration</h2>
<p>The included Templates demonstration uses the <a class="mceNonEditable" href="../../7/advanced-templates/#advtemplate_list"><code>advtemplate_list</code></a> configuration option to return a local promise containing a basic Template structure with self-contained examples.</p>
<p>This example allows for the loading of and interacting with the Template user-interface but cannot be used to create, edit, or save Template items.</p>
<p>See the <a class="mceNonEditable" href="../../7/advanced-templates/">Templates</a> documentation for details on how to setup Templates to interact with external data sources.</p>
<h2>Found a bug?</h2>
<p>If you think you have found a bug please create an issue on the <a href="https://github.com/tinymce/tinymce/issues">GitHub repo</a> to report it to the developers.</p>
<h2>Finally&hellip;</h2>
<p>Don&rsquo;t forget to check out our other product <a href="http://plupload.com" target="_blank" rel="noopener">Plupload</a>, your ultimate upload solution featuring HTML5 upload support.</p>
<p>Thanks for supporting TinyMCE! We hope it helps you and your users create great content.</p>
<p>All the best from the TinyMCE team.</p>
            `,
            }}
          />
        </Modal>
      </>
    );
  }
);

export default CheckoutAdditionalForms;
