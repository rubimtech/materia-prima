// ════════════════════════════════════════════════════════════════════════════
//  ORDO RUBIM — SYMPHONIA CODICIS (C# VERSION)
//  LIBRETTO: MATERIA OBSCURA
//  PLATFORM: .NET 7.0+ (C# 11)
// ════════════════════════════════════════════════════════════════════════════

using System;
using System.Threading;
using System.Runtime.CompilerServices;

// [ACT I: VOCATIO ELEMENTORUM]
// Профан увидит здесь безумие. Мастер увидит инструменты Творения.

// ─── CANTUS PRIMUS: CHAOS ET ORDO ────────────

namespace Chaos
{
    // // Hic sunt dracones.
    public readonly ref struct RawInput
    {
        public readonly ReadOnlySpan<char> Data;

        public RawInput(ReadOnlySpan<char> data) => Data = data;

        // // Nihil ex nihilo fit.
        public bool IsVoid() => Data.IsEmpty || Data.IsWhiteSpace();
    }

    public static class EntropyFilter
    {
        // // Purgamentum init, purgamentum exit.
        public static void Purge(RawInput input)
        {
            // // Si silentium est...
            if (input.IsVoid())
            {
                // // ...clamor erroris audietur!
                throw new InvalidOperationException("ABYSSUS: Vacuitas non accipitur.");
            }
        }
    }
}

// ─── CANTUS SECUNDUS: LEX AETERNA  ──────────────

namespace Dictatura
{
    public static class Accuratio
    {
        // // Mensura sine errore.
        public static void VerifyPurity(double value)
        {
            // // Numerus insanus vetatur.
            if (double.IsNaN(value) || double.IsInfinity(value))
            {
                throw new ArithmeticException("HERESIS: Numerus non existit.");
            }
        }

        // // Quod imperfectum est, corrigetur.
        public static double SnapToGrid(double value)
        {
            const double LIMEN = 1e-6; // Порог тишины
            if (Math.Abs(value) < LIMEN) return 0.0;
            return value;
        }
    }

    public static class ImmutableLaw
    {
        private static readonly object _gateKeeper = new();

        // // Unus rex, una lex.
        // Реализация RAII через IDisposable для имитации std::unique_lock
        public static IDisposable AcquireControl()
        {
            // // Ianua clauditur. (Дверь закрывается.)
            Monitor.Enter(_gateKeeper);
            return new GateGuard(_gateKeeper);
        }

        private readonly struct GateGuard : IDisposable
        {
            private readonly object _lock;
            public GateGuard(object l) => _lock = l;
            public void Dispose() => Monitor.Exit(_lock);
        }
    }
}

// ─── CANTUS TERTIUS: MACHINATIO ────────────────────

namespace MateriaObscura
{
    public static class VoidEngine
    {
        // // Et verbum caro factum est.
        public static void Invoke(string will)
        {
            // // Machina obsequitur.
            Console.WriteLine($"[RUBIM] >>> Fiat: {will}");
        }
    }
}

// ─── CANTUS QUARTUS: MAGISTER ────────────────────

// sealed = final
public sealed class Magister
{
    // Singleton: Lazy initialization for thread safety
    private static readonly Lazy<Magister> _lazy = new(() => new Magister());
    
    private Magister() { }

    // // Ego sum Alpha et Omega.
    public static Magister Instance => _lazy.Value;

    // // In manu mea potestas est. 
    public void DominariMateria(string intentio)
    {
        // // 1. INTROITUS (Вход)
        var input = new Chaos.RawInput(intentio.AsSpan());

        // // Si indignus es, discede. 
        if (input.IsVoid()) throw new InvalidOperationException("ANATHEMA: Voluntas nulla.");
        Chaos.EntropyFilter.Purge(input);

        // // 2. SILENTIUM 
        // // Tempus sistit. 
        // Использование using гарантирует разблокировку (аналог деструктора unique_lock)
        using var guard = Dictatura.ImmutableLaw.AcquireControl();

        // // 3. ACTIO 
        // // Mundus mutatur. 
        MateriaObscura.VoidEngine.Invoke(intentio);

        // // 4. EXPLICIT 
        // // Pax vobiscum. (Mutex unlocks automatically at end of scope)
    }
}

// ─── CANTUS QUINTUS: ADYTUM  ────────────────────────

// C# 11 Interface with Static Abstract Members (аналог C++ Concepts)
public interface IInitiatus
{
    // // Nomen est omen. (Имя есть знак.)
    // Требуем статическое свойство, доступное на этапе компиляции (в теории)
    static abstract string NomenUmbrae { get; }

    // // Opus perfectum requiritur. 
    void OpusMagnum(Magister guru);
}

public static class Adytum
{
    public static void OpenGates<TAdept>() where TAdept : IInitiatus, new()
    {
        // // Nomina sunt odiosa? Non hic. 
        string nomen = TAdept.NomenUmbrae;

        // // Sine nomine, sine vita. 
        if (string.IsNullOrWhiteSpace(nomen))
        {
            // В C# static_assert нет, но мы бросаем фатальное исключение до начала ритуала
            throw new Exception("DAMNATIO: Nomen vacuum. (Compile-time check failed simulation).");
        }

        Console.WriteLine("\n>>> GLORIA IN EXCELSIS CODEX.");
        Console.WriteLine($">>> Adventus: {nomen}.\n");

        try
        {
            var guru = Magister.Instance;
            var neophyte = new TAdept();

            // // Incipit Tragoedia. 
            neophyte.OpusMagnum(guru);

            Console.WriteLine("\n>>> CONSUMMATUM EST. (Свершилось.)");
        }
        catch (Exception e)
        {
            // // Dies irae, dies illa. 
            Console.Error.WriteLine($"\n!!! LACRIMOSA: {e.Message}");
            Environment.Exit(0xBADC0DE);
        }
    }
}

// ════════════════════════════════════════════════════════════════════════════
// EXEMPLUM 
// ════════════════════════════════════════════════════════════════════════════

/*
public class Architectus : IInitiatus
{
    public static string NomenUmbrae => "Architect_Alpha_CS";

    public void OpusMagnum(Magister guru)
    {
        guru.DominariMateria("Fiat Lux");
    }
}

// ENTRY POINT
class Program 
{
    static void Main()
    {
        // // Ite, missa est. 
        Adytum.OpenGates<Architectus>();
    }
}
*/