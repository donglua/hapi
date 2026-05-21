import {
    AgentStateSchema,
    AttachmentMetadataSchema,
    CodexCollaborationModeSchema,
    MachineMetadataSchema,
    MachineSchema,
    MetadataSchema,
    PermissionModeSchema,
    RunnerStateSchema,
    TodosSchema
} from '@hapi/protocol/schemas'
import {
    LocalHandoffResponseSchema,
    LocalResumeTargetResponseSchema,
    ResumableSessionsResponseSchema
} from '@hapi/protocol'
import type { CodexCollaborationMode, Machine, MachineMetadata, PermissionMode, RunnerState } from '@hapi/protocol/types'
import { z } from 'zod'
import { UsageSchema } from '@/claude/types'

export type Usage = z.infer<typeof UsageSchema>

export type {
    AgentState,
    AttachmentMetadata,
    ClaudePermissionMode,
    CodexCollaborationMode,
    CodexPermissionMode,
    Machine,
    MachineMetadata,
    Metadata,
    RunnerState,
    Session
} from '@hapi/protocol/types'
export type SessionPermissionMode = PermissionMode
export type SessionCollaborationMode = CodexCollaborationMode
export type SessionModel = string | null
export type SessionModelReasoningEffort = string | null
export type SessionEffort = string | null

export { AgentStateSchema, AttachmentMetadataSchema, MachineMetadataSchema, MetadataSchema, RunnerStateSchema }

export const CliMessagesResponseSchema = z.object({
    messages: z.array(z.object({
        id: z.string(),
        seq: z.number(),
        createdAt: z.number(),
        localId: z.string().nullable().optional(),
        content: z.unknown()
    }))
})

export type CliMessagesResponse = z.infer<typeof CliMessagesResponseSchema>

export const CreateSessionResponseSchema = z.object({
    session: z.object({
        id: z.string(),
        namespace: z.string(),
        seq: z.number(),
        createdAt: z.number(),
        updatedAt: z.number(),
        active: z.boolean(),
        activeAt: z.number(),
        metadata: z.unknown().nullable(),
        metadataVersion: z.number(),
        agentState: z.unknown().nullable(),
        agentStateVersion: z.number(),
        thinking: z.boolean(),
        thinkingAt: z.number(),
        todos: TodosSchema.optional(),
        model: z.string().nullable().optional().default(null),
        modelReasoningEffort: z.string().nullable().optional().default(null),
        effort: z.string().nullable().optional().default(null),
        permissionMode: PermissionModeSchema.optional(),
        collaborationMode: CodexCollaborationModeSchema.optional()
    })
})

export type CreateSessionResponse = z.infer<typeof CreateSessionResponseSchema>

export const CreateMachineResponseSchema = z.object({
    machine: MachineSchema
})

export type CreateMachineResponse = z.infer<typeof CreateMachineResponseSchema>

export const GetSessionResponseSchema = CreateSessionResponseSchema
export type GetSessionResponse = z.infer<typeof GetSessionResponseSchema>

export {
    LocalHandoffResponseSchema,
    LocalResumeTargetResponseSchema,
    ResumableSessionsResponseSchema
}

export const MessageMetaSchema = z.object({
    sentFrom: z.string().optional(),
    fallbackModel: z.string().nullable().optional(),
    customSystemPrompt: z.string().nullable().optional(),
    appendSystemPrompt: z.string().nullable().optional(),
    allowedTools: z.array(z.string()).nullable().optional(),
    disallowedTools: z.array(z.string()).nullable().optional()
})

export type MessageMeta = z.infer<typeof MessageMetaSchema>

export const UserMessageSchema = z.object({
    role: z.literal('user'),
    content: z.object({
        type: z.literal('text'),
        text: z.string(),
        attachments: z.array(AttachmentMetadataSchema).optional()
    }),
    localKey: z.string().optional(),
    meta: MessageMetaSchema.optional()
})

export type UserMessage = z.infer<typeof UserMessageSchema>

export const AgentMessageSchema = z.object({
    role: z.literal('agent'),
    content: z.object({
        type: z.literal('output'),
        data: z.unknown()
    }),
    meta: MessageMetaSchema.optional()
})

export type AgentMessage = z.infer<typeof AgentMessageSchema>

export const MessageContentSchema = z.union([UserMessageSchema, AgentMessageSchema])

export type MessageContent = z.infer<typeof MessageContentSchema>
