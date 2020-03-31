/** @jsx JSXSlack.h */
import { View } from '@slack/types'
import { generateBlocksContainer } from './utils'
import { plainText } from '../composition/utils'
import { Divider } from '../layout/Divider'
import { Image } from '../layout/Image'
import { Input, knownInputs } from '../layout/Input'
import { Section } from '../layout/Section'
import { JSXSlack, createComponent } from '../../jsx'

type PrivateMetadataTransformer = (
  hiddenValues: object | undefined
) => string | undefined

interface ModalProps {
  children: JSXSlack.ChildElements
  callbackId?: string
  clearOnClose?: boolean
  close?: string
  externalId?: string
  notifyOnClose?: boolean
  privateMetadata?: string // | PrivateMetadataTransformer
  submit?: string
  title: string
}

const ModalBlocks = generateBlocksContainer({
  name: 'Modal',
  availableBlockTypes: [
    'actions',
    'context',
    'divider',
    'image',
    'input',
    'section',
  ],
  aliases: {
    hr: Divider,
    img: Image,
    input: Input,
    section: Section,
    // textarea: Textarea,
  },
  typesToCheckMissingLabel: knownInputs,
})

/**
 * The container component for the view of
 * {@link https://api.slack.com/surfaces/modals|modals}.
 *
 * `<Modal>` can include following block elements:
 *
 * - `<Section>` (`<section>`)
 * - `<Image>` (`<img>`)
 * - `<Divider>` (`<hr>`)
 * - `<Context>`
 * - `<Actions>`
 * - `<Input>` (`<input>`)
 *
 * ...and these input components (Require defining `label` prop):
 *
 * - `<Input label="...">` (`<input label="...">`)
 * - `<Textarea label="...">` (`<textarea label="...">`)
 * - `<Select label="...">` (`<select label="...">`)
 * - `<ExternalSelect label="...">`
 * - `<UsersSelect label="...">`
 * - `<ConversationsSelect label="...">`
 * - `<ChannelsSelect label="...">`
 * - `<DatePicker label="...">`
 * - `<CheckboxGroup label="...">`
 * - `<RadioButtonGroup label="...">`
 *
 * @example
 * ```jsx
 * api.views.open({
 *   trigger_id: 'xxxxx.xxxxx.xxxxxxxxxxxx',
 *   view: (
 *     <Modal title="My first modal">
 *       <Section>Hello, modal!</Section>
 *     </Modal>
 *   ),
 * })
 * ```
 *
 * **NOTE**: TypeScript requires to cast JSX into suited type / `any`, or wrap
 * with `JSXSlack(<Modal>...</Modal>)`.
 *
 * @return The object of `view` payload, for `view` field in
 *   {@link https://api.slack.com/methods/views.open|views.open} and some
 *   similar APIs
 */
export const Modal = createComponent<ModalProps, View>('Modal', (props) => ({
  type: 'modal',
  title: plainText(props.title),
  callback_id: props.callbackId,
  external_id: props.externalId,
  submit: props.submit ? plainText(props.submit) : undefined,
  close: props.close ? plainText(props.close) : undefined,
  private_metadata: props.privateMetadata,
  clear_on_close:
    props.clearOnClose !== undefined ? !!props.clearOnClose : undefined,
  notify_on_close:
    props.notifyOnClose !== undefined ? !!props.notifyOnClose : undefined,
  blocks: (<ModalBlocks children={props.children} />) as any,
}))